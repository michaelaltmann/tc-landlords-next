import { useParcel, useKeyword } from "../../lib/hooks";
import { useRouter } from "next/router";
import Portfolio from "../../components/Portfolio";
import { BiLinkExternal } from "react-icons/bi";
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
    const upper_county = parcel?.county?.toUpperCase();
    let parcel_url = undefined;
    const county_pid = parcel?.id?.split("-")[3] || "";
    switch (upper_county) {
      case "HENNEPIN":
        parcel_url = `https://www16.co.hennepin.mn.us/pins/pidresult.jsp?pid=${county_pid}`;
        break;
      case "RAMSEY":
        parcel_url = `https://beacon.schneidercorp.com/application.aspx?AppID=959&LayerID=18852&PageTypeID=4&PageID=8397&Q=1822844214&KeyValue=${county_pid}`;
        break;
      case "SCOTT":
        parcel_url = `https://publicaccess.scottcountymn.gov/Datalets/Datalet.aspx?pin=${county_pid}`;
        break;
      case "WASHINGTON":
        parcel_url = `https://mn-washington.manatron.com/Tabs/TaxSearch/AccountDetail.aspx?p=${county_pid}`;
        break;
      case "DAKOTA":
        parcel_url = `https://gis.co.dakota.mn.us/PropertyCard/PropertyCard.aspx?pin=${county_pid}`;
        break;
      case "ANOKA":
        parcel_url = undefined;
        break;
      case "CARVER":
        if (county_pid) {
          const pid =
            county_pid.substring(0, 2) + "." + county_pid.substring(2);
          parcel_url = `https://mn-carver.manatron.com/Tabs/TaxSearch/ParcelDetail.aspx?a=29124&p=${pid}`;
        }
        break;
      default:
        parcel_url = undefined;
    }
    return (
      <div className="ml-4">
        <div>
          <div className="text-center text-xl">Parcel {id}</div>
          {parcel && (
            <>
              <div>
                {" "}
                <b>Address: </b> {parcel.address}
              </div>
              <div>
                <b>Owner: </b>
                {parcel.owner_name}{" "}
                {parcel.owner_address && (
                  <>
                    <b>at</b> {parcel.owner_address}
                  </>
                )}
              </div>
              <div>
                <b>Taxpayer: </b>
                {parcel.taxpayer_name}
              </div>
              <div>
                <b>Homestead: </b> {parcel.homestead ? "Y" : "N"}{" "}
              </div>
              <div>
                <b>Landlord license: </b> {parcel.license_num}{" "}
              </div>
              {parcel_url && (
                <div>
                  <b>Tax details: </b>
                  <a
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    href={parcel_url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {parcel.county} county site{" "}
                    <BiLinkExternal style={{ display: "flow" }} />
                  </a>
                </div>
              )}{" "}
            </>
          )}
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
