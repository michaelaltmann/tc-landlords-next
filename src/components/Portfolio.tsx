import ParcelView from "./Parcel";
import type { Parcel } from "@prisma/client";
import { useParcel } from "../lib/hooks";
import { useState } from "react";
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

  function buildTabHeaders() {
    return (
      <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          {tabs.map((tab) => {
            if (tab.toUpperCase() === mode?.toUpperCase())
              return (
                <li
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
    else return <>Unknown view mode {mode}</>;
  }
  return (
    <>
      {buildTabHeaders()} {buildTabs()}
    </>
  );
}
