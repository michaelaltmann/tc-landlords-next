// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useParcel } from "../lib/hooks";

import { useState } from "react";
import Parcel from "../components/Parcel";
import ParcelView from "../components/Parcel";
import { ParcelsListView } from "../components/ParcelsListView";
import { ParcelsMapView } from "../components/ParcelsMapView";

type SeachResultsPrams = { s: string };
function SearchResults(params: SeachResultsPrams) {
  const { s } = params;

  const byParcelId = {
    id: { startsWith: `US-MN-${s}` },
  };
  const byAddress = { address: { startsWith: s } };
  const words: string[] = s.split(" ").filter((word) => word.length > 2);
  const fragments = words.map((word: string) => {
    const fragment = {
      keywords: {
        some: {
          phrase: {
            startsWith: word,
          },
        },
      },
    };
    return fragment;
  });
  const byKeyword = { AND: fragments };

  const { data: parcels } = useParcel().findMany({
    where: {
      OR: [byParcelId, byAddress, byKeyword],
    },
    take: 100,
  });

  if (parcels) {
    if (parcels?.length > 0) {
      return (
        <ul>
          {parcels?.map((parcel) => {
            return <Parcel parcel={parcel} key={parcel.id} />;
          })}
        </ul>
      );
    } else {
      return <>No matching parcels</>;
    }
  } else {
    return <>Loading ...</>;
  }
}

function LargePortfolios() {
  const { data: sampleParcels } = useParcel().findMany({
    //take: 10,
    where: { portfolio_size: { gt: 500 } },
  });

  const tabs = ["List", "Map"];

  const [mode, setMode] = useState(tabs[0]);

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
    if (mode?.toUpperCase() === "LIST")
      return <ParcelsListView parcels={sampleParcels || []} />;
    if (mode?.toUpperCase() === "MAP")
      return <ParcelsMapView parcels={sampleParcels || []} />;
    else return <>Unknown view mode {mode}</>;
  }
  return (
    <>
      {buildTabHeaders()} {buildTabs()}
    </>
  );
}

export default function Parcels() {
  const [query, setQuery] = useState("");

  const readyToSearch = query && query?.length >= 4;

  return (
    <div className="ml-8 mt-1">
      <div className="text-center text-xl">
        Parcels matching:{" "}
        <input
          type="text"
          minLength={40}
          className="bg-gray-300"
          onBlur={(e) => {
            setQuery(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setQuery(e.currentTarget.value);
            }
          }}
        ></input>
      </div>
      {readyToSearch && <SearchResults s={query.toUpperCase()} />}
      {!readyToSearch && (
        <>
          <span className="text-lg">Sample Parcels from Large Portfolios</span>
          <LargePortfolios />
        </>
      )}
    </div>
  );
}
