import Parcel from "./Parcel";
import { useParcel } from "../lib/hooks";

export default function Portfolio({ parcel }: any) {
  const { data: parcels } = useParcel().findMany({
    where: { portfolio_id: parcel?.portfolio_id },
  });
  return (
    <>
      <div className="text-center text-xl">
        Owner&apos;s Parcels ({parcels?.length})
      </div>
      <ul>
        {!parcels && "Loading ..."}
        {parcels && parcels.map((p) => <Parcel parcel={p} />)}
      </ul>
    </>
  );
}
