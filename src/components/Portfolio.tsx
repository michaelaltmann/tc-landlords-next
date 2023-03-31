import ParcelView from "./Parcel";
import type { Parcel } from "@prisma/client";
import { useParcel } from "../lib/hooks";
import { useState } from "react";
type ParcelPrams = { parcel: Parcel };

export default function Portfolio({ parcel }: ParcelPrams) {
  const { data: parcels } = useParcel().findMany({
    where: { portfolio_id: parcel?.portfolio_id },
  });

  const [mode, setMode] = useState("LIST");

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
  if (mode === "LIST") return <ListView />;
}
