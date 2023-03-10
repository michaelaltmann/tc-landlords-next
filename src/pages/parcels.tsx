import { useParcel } from "../lib/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";

type SeachResultsPrams = { s: string };
function SearchResults(params: SeachResultsPrams) {
  useEffect(() => {
    console.log("Use effect");
  });
  const { s } = params;
  const Parcel = useParcel();
  function search() {
    console.log(`searching for ${s}`);
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
    return Parcel.findMany({
      where: {
        OR: [byParcelId, byAddress, byKeyword],
      },
      take: 100,
    });
  }

  const res = search();
  const parcels = res?.data;

  if (parcels) {
    if (parcels?.length > 0) {
      return (
        <ul>
          {parcels?.map((parcel) => {
            return (
              <li key={parcel.id}>
                <Link
                  className="font-mono text-blue-600 underline"
                  href={"/parcel/" + parcel.id}
                >
                  {parcel.id}
                </Link>{" "}
                <span className="">{parcel.address}</span>
                {"  "}
                <span className="text-sm">
                  <i>{parcel.owner_name}</i>
                </span>
              </li>
            );
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
    take: 10,
    where: {
      AND: [{ portfolio_size: { gt: 50 } }, { portfolio_size: { lt: 60 } }],
    },
  });
  return (
    <ul>
      {sampleParcels?.map((parcel) => {
        return (
          <li key={parcel.id}>
            <Link
              className="font-mono text-blue-600 underline"
              href={"/parcel/" + parcel.id}
            >
              {parcel.id}
            </Link>{" "}
            <span className="">{parcel.address}</span>
            {"  "}
            <span className="text-sm">
              <i>{parcel.owner_name}</i>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function Parcels() {
  const [query, setQuery] = useState("");

  const readyToSearch = query && query?.length >= 4;

  return (
    <div className="ml-8">
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
          Enter a search phrase (at least 4 chars)
          <h4>Sample Parcels from Large Portfolios</h4>
          <LargePortfolios />
        </>
      )}
    </div>
  );
}
