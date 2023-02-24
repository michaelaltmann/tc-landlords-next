import { useParcel, useKeyword, useTag } from "../../lib/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Parcel() {
  const router = useRouter();
  const { id } = router.query;
  function SearchResults() {
    const { data: parcel } = useParcel().findUnique({
      where: { id: id?.toString().toUpperCase() },
    });

    const { data: keywords } = useKeyword().findMany({
      where: { parcel_id: id?.toString().toUpperCase() },
    });

    const { data: tags } = useTag().findMany({
      where: { parcel_id: id?.toString().toUpperCase() },
    });
    const { data: parcels } = useParcel().findMany({
      where: { portfolio_id: parcel?.portfolio_id },
    });
    return (
      <div className="ml-4">
        <div>
          <div className="text-center text-xl">Parcel {id}</div>
          {parcel && <div> {parcel.address}</div>}
        </div>
        <div className="text-center text-xl">Tags</div>
        <ul>
          {!tags && "Loading ..."}
          {tags &&
            tags.map((tag) => (
              <li key={tag.id}>
                <span>
                  <b>{tag.source_type}: </b>
                </span>
                <span>{tag.tag_value}</span>
              </li>
            ))}
        </ul>
        <div className="text-center text-xl">Keywords</div>
        <ul>
          {!keywords && "Loading ..."}
          {keywords &&
            keywords.map((keyword) => (
              <li key={keyword.id}>{keyword.phrase}</li>
            ))}
        </ul>
        <div className="text-center text-xl">
          Owner&apos;s Parcels ({parcels?.length})
        </div>
        <ul>
          {!parcels && "Loading ..."}
          {parcels &&
            parcels.map((p) => (
              <li key={p.id}>
                <Link
                  className="text-blue-600 underline"
                  href={"/parcel/" + p.id}
                >
                  {p.address}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  if (id) return <SearchResults />;
  else return <></>;
}
