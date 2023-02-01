import { useParcel } from "../../lib/hooks";
import { useRouter } from "next/router";
type Props = {};

export default function Parcels(params: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { findUnique } = useParcel();
  const { data: parcel } = findUnique({ where: { id: id?.toString() } });

  return (
    <div className="ml-8">
      <div className="text-center text-xl">Parcel {id}</div>
      {parcel && <div> {parcel.address}</div>}
    </div>
  );
}
