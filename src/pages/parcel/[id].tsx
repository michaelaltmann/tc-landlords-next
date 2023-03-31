import { useParcel, useKeyword, useTag } from "../../lib/hooks";
import { useRouter } from "next/router";
import Portfolio from "../../components/Portfolio";

export default function ParcelView() {
  const router = useRouter();
  const { id } = router.query;
  function SearchResults() {
    const { data: parcel } = useParcel().findUnique({
      where: { id: id?.toString().toUpperCase() },
    });

    const { data: keywords } = useKeyword().findMany({
      where: { parcel_id: id?.toString().toUpperCase() },
    });

    return (
      <div className="ml-4">
        <div>
          <div className="text-center text-xl">Parcel {id}</div>
          {parcel && <div> {parcel.address}</div>}
        </div>
        <div className="text-center text-xl">Keywords</div>
        <ul>
          {!keywords && "Loading ..."}
          {keywords &&
            [...new Set(keywords.map((keyword) => keyword.phrase))].map(
              (phrase) => <li key={phrase}>{phrase}</li>
            )}
        </ul>
        {parcel?.portfolio_id && <Portfolio parcel={parcel}></Portfolio>}
      </div>
    );
  }
  if (id) return <SearchResults />;
  else return <></>;
}
