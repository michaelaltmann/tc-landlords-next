import ParcelView from "./Parcel";
import type { Parcel } from "@prisma/client";
import { useParcel } from "../lib/hooks";
import { useState, useRef, useEffect } from "react";
// eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

type ParcelPrams = { parcel: Parcel };

export default function Portfolio({ parcel }: ParcelPrams) {
  const { data: parcels } = useParcel().findMany({
    where: { portfolio_id: parcel?.portfolio_id },
  });
  const tabs = ["List", "Map"];

  const [mode, setMode] = useState(tabs[0]);

  function ListView() {
    return (
      <>
        <div className="text-center text-xl">
          Owner&apos;s Parcels ({parcels?.length})
        </div>
        <ul>
          {!parcels && "Loading ..."}
          {parcels && parcels.map((p) => <ParcelView parcel={p} key={p.id} />)}
        </ul>
      </>
    );
  }

  function MapView() {
    const mapContainer = useRef(null);

    const [lng, setLng] = useState(-93.26);
    const [lat, setLat] = useState(44.97);
    const [zoom, setZoom] = useState(9);
    let selectedFeatureId: string | undefined = "";
    function buildLayer(m: mapboxgl.Map) {
      console.log("Building ");
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
      m.addSource("portfolio", {
        type: "geojson",
        data: {
          type: "FeatureCollection" as const,
          features: features,
        },
        generateId: true,
      });
      m.addLayer({
        id: "portfolio",
        type: "circle",
        source: "portfolio",
        paint: {
          "circle-radius": 6,
          "circle-stroke-color": "black",
          "circle-stroke-width": 1,
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "lightGreen",
            "darkGreen",
          ],
        },
      });
    }
    useEffect(() => {
      const node = mapContainer.current;
      if (typeof window === "undefined" || node === null) return;

      const mapboxMap = new mapboxgl.Map({
        container: node,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      mapboxMap.on("load", () => buildLayer(mapboxMap));

      mapboxMap.on("mousemove", "portfolio", function (e) {
        var features = e.features || [];
        var hover;
        if (features.length >= 0) {
          var feature = features[0];
          hover =
            '<b> <a href = "property/' +
            feature?.properties?.parcel_id +
            '">' +
            feature?.properties?.address +
            "</a></b> ";
          const el = document.getElementById("featureDetail");
          if (el) el.innerHTML = hover;
          if (selectedFeatureId) {
            mapboxMap.removeFeatureState({
              source: "portfolio",
              id: selectedFeatureId,
            });
          }
          selectedFeatureId = "" + feature?.id;
          mapboxMap.setFeatureState(
            {
              source: "portfolio",
              id: selectedFeatureId,
            },
            {
              hover: true,
            }
          );
        }
        return () => {
          mapboxMap.remove();
        };
      });
    }, [parcels]);

    return (
      <>
        <div id="featureDetail"></div>
        <div ref={mapContainer} style={{ height: "600px" }} />
      </>
    );
  }
  function buildTabHeaders() {
    return (
      <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          {tabs.map((tab) => {
            if (tab.toUpperCase() === mode?.toUpperCase())
              return (
                <li
                  key={tab}
                  className="mr-2"
                  onClick={() => {
                    setMode(tab);
                  }}
                >
                  <a
                    href="#"
                    aria-current="page"
                    className="active inline-block rounded-t-lg bg-gray-100 p-4 text-blue-600 dark:bg-gray-800 dark:text-blue-500"
                  >
                    {tab}
                  </a>
                </li>
              );
            else
              return (
                <li
                  key={tab}
                  className="mr-2"
                  onClick={() => {
                    setMode(tab);
                  }}
                >
                  <a
                    href="#"
                    className="inline-block rounded-t-lg p-4 hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                  >
                    {tab}
                  </a>
                </li>
              );
          })}
        </ul>
      </div>
    );
  }
  function buildTabs() {
    if (mode?.toUpperCase() === "LIST") return <ListView />;
    if (mode?.toUpperCase() === "MAP") return <MapView />;
    else return <>Unknown view mode {mode}</>;
  }
  return (
    <>
      {buildTabHeaders()} {buildTabs()}
    </>
  );
}
