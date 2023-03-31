import Link from "next/link";

export default function Parcel({ parcel }: any) {
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
}
