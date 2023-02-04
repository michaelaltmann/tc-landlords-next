import { useParcel } from "../lib/hooks";
import Link from "next/link";
import { useState } from "react";

export default function Parcels() {
  const [s, setS] = useState("");
  const { findMany } = useParcel();
  const readyToSearch = s && s?.length > 4;
  const { data: parcels } = readyToSearch
    ? findMany({
        where: { address: { contains: s, mode: "insensitive" } },
        take: 100,
      })
    : findMany({});
  return (
    <div className="ml-8">
      <div className="text-center text-xl">
        Parcels matching:{" "}
        <input
          type="text"
          minLength={40}
          className="bg-gray-300"
          onBlur={(e) => {
            setS(e.target.value);
          }}
        ></input>
      </div>
      <ul>
        {parcels?.map((parcel) => {
          return (
            <li key={parcel.id}>
              <Link href={"/parcel/" + parcel.id}>{parcel.id}</Link>{" "}
              <span className="bg-yellow-100 text-red-900">
                {parcel.address}{" "}
              </span>
            </li>
          );
        })}
        {readyToSearch && !parcels && <>Loading ...</>}
        {!readyToSearch && <>Enter a search (at least 4 chars)</>}
      </ul>
    </div>
  );
}
