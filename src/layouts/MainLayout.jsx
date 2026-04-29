import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
