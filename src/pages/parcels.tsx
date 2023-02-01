import { useParcel } from "../lib/hooks";
type Props = {};

export default function Parcels({}: Props) {
  const { findMany } = useParcel();
  const { data: parcels } = findMany({});
  return (
    <div className="ml-8">
      <div className="text-center text-xl">Parcels</div>
      <ul>
        {parcels?.map((parcel) => {
          return (
            <li className="bg-yellow-100 text-red-900">{parcel.address}</li>
          );
        })}
      </ul>
    </div>
  );
}
