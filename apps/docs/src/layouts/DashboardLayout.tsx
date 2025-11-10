import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";


export const DashboardLayout = () => {
  return (
    <>
<div className="min-h-screen flex flex-col ">
      <div className="flex items-start">
        <Sidebar />
        <main className="flex-1 pl-8 pr-9 pb-20">
          <Header />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>

</>
  );
};
