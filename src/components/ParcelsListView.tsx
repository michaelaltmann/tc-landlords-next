import ParcelView from "./Parcel";
import type { Parcel } from "@prisma/client";

type ParcelsParams = { parcels: Parcel[] };

export function ParcelsListView({ parcels }: ParcelsParams) {
  return (
    <>
      <div className="text-center text-xl">Parcels ({parcels?.length})</div>
      <ul>
        {!parcels && "Loading ..."}
        {parcels && parcels.map((p) => <ParcelView parcel={p} key={p.id} />)}
      </ul>
    </>
  );
}
