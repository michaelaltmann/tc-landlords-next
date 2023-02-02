import { useParcel } from "../lib/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Parcels() {
  const router = useRouter();
  const { q } = router.query;
  const { findMany } = useParcel();
  const { data: parcels } = q
    ? findMany({ where: { address: { contains: q.toString() } } })
    : findMany({});
  return (
    <div className="ml-8">
      <div className="text-center text-xl">Parcels matching {q}</div>
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
      </ul>
    </div>
  );
}
