import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
