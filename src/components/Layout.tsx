function Header() {
  return (
    <div className="text-center text-2xl font-bold">Twin Cities Landlords</div>
  );
}
function Footer() {
  return (
    <div className="bg-slate-400 text-center text-white">
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
