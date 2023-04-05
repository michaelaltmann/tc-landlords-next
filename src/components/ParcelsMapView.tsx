import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
import type { Parcel } from "@prisma/client";

type ParcelsParams = { parcels: Parcel[] };
type Portfolio = { parcels: Parcel[]; names: string[] };

export function ParcelsMapView({ parcels }: ParcelsParams) {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-93.26);
  const [lat, setLat] = useState(44.97);
  const [zoom, setZoom] = useState(9);
  const [selectedPortfolios, setSelectedPortfolios] = useState([] as number[]);
  let selectedFeatureId: string | undefined = "";
  const mapboxMap = useRef<mapboxgl.Map | null>(null);
  const portfolios: Map<number, Portfolio> = (parcels || []).reduce(
    (r: Map<number, Portfolio>, parcel) => {
      if (!r.get(parcel.portfolio_id))
        r.set(parcel.portfolio_id, {
          parcels: [],
          names: [],
        });
      r.get(parcel.portfolio_id)?.parcels.push(parcel);
      return r;
    },
    new Map<number, Portfolio>()
  );
  portfolios.forEach((p: Portfolio, key: number) => {
    p.names = [
      ...new Set(p.parcels.map((p: Parcel) => p.owner_name || "")),
    ].sort();
  });
  function buildLayer() {
    const features = (parcels || []).map((parcel) => {
      const feature = {
        type: "Feature" as const,
        properties: parcel,
        geometry: {
          type: "Point" as const,
          coordinates: [parcel.lon as number, parcel.lat as number],
        },
      };
      return feature;
    });
    const sortedParcels = (parcels || []).sort((a, b) => {
      return a.portfolio_size - b.portfolio_size;
    });
    const minPortfolioSize = sortedParcels.length
      ? sortedParcels[0]?.portfolio_size
      : 0;
    const maxPortfolioSize = sortedParcels.length
      ? sortedParcels[sortedParcels.length - 1]?.portfolio_size
      : 0;

    mapboxMap.current?.addSource("parcels", {
      type: "geojson",
      data: {
        type: "FeatureCollection" as const,
        features: features,
      },
      generateId: true,
    });
    mapboxMap.current?.addLayer({
      id: "parcels",
      type: "circle",
      source: "parcels",
      paint: {
        "circle-radius": 6,
        "circle-stroke-color": "black",
        "circle-stroke-width": 1,
        "circle-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          "white",
          [
            "interpolate-hcl",
            ["linear"],
            ["get", "portfolio_size"],
            minPortfolioSize,
            "blue",
            (maxPortfolioSize as number) + 1,
            "red",
          ],
        ],
      },
    });
    updateFilter([]);
    mapboxMap.current?.on("mousemove", "parcels", function (e) {
      const features = e.features || [];
      let hover;
      if (features.length >= 0) {
        const feature = features[0];
        hover = `<b> <a href = "/parcel/${
          (feature?.properties?.id as string) || ""
        }"> ${(feature?.properties?.address as string) || ""}</a></b> ${
          (feature?.properties?.portfolio_size as number) || ""
        } ${(feature?.properties?.owner_name as string) || ""}`;
        const el = document.getElementById("featureDetail");
        if (el) el.innerHTML = hover;
        if (selectedFeatureId) {
          mapboxMap.current?.removeFeatureState({
            source: "parcels",
            id: selectedFeatureId,
          });
        }
        selectedFeatureId = feature?.id as string;
        mapboxMap.current?.setFeatureState(
          {
            source: "parcels",
            id: selectedFeatureId,
          },
          {
            hover: true,
          }
        );
      }
    });
  }
  useEffect(() => {
    if (typeof window === "undefined" || mapContainer.current === null) return;

    mapboxMap.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    mapboxMap.current?.on("load", buildLayer);
    return () => {
      mapboxMap.current?.remove();
    };
  }, [parcels]);

  function handleSelectedPortfolioChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      updateFilter([...selectedPortfolios, value]);
    } else {
      updateFilter(selectedPortfolios.filter((x) => x != value));
    }
  }
  function updateFilter(a: number[]) {
    mapboxMap.current?.setFilter("parcels", [
      "match",
      ["get", "portfolio_id"],
      a,
      true,
      false,
    ]);
    setSelectedPortfolios(a);
  }
  return (
    <>
      <div id="featureDetail"></div>
      <div ref={mapContainer} style={{ height: "600px" }} />{" "}
      {portfolios.size > 1 &&
        Array.from(portfolios).map((el) => {
          const portfolio = el[1];
          return (
            <div key={portfolio.parcels[0]?.portfolio_id}>
              <input
                className="mr-2"
                type="checkbox"
                checked={selectedPortfolios.includes(
                  portfolio.parcels[0]?.portfolio_id || 0
                )}
                name="x"
                value={portfolio.parcels[0]?.portfolio_id}
                onChange={handleSelectedPortfolioChange}
              />
              <small>{portfolio.names.filter((x) => x).join(",")}</small>
            </div>
          );
        })}
    </>
  );
}
