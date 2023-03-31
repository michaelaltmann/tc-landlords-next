import Link from "next/link";

function Header() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-6">
      <div className="flex flex-shrink-0 items-center text-white">
        <Link className="ml-2 mr-2" href={"/parcels"}>
          <img src="/favicon-32x32.png" width="30" height="30" />
        </Link>
        <span className="text-xl font-semibold tracking-tight">
          Twin Cities Renter's Resources
        </span>
      </div>
    </nav>
  );
}
function Footer() {
  return (
    <div className="bg-teal-500 text-center text-white">
      Copyright 2023 Michael Altmann
    </div>
  );
}
export default function Layout({ children }: any) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
