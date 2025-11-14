import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const DashboardLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <div className="flex h-full ">
          <Sidebar />
          <main className="flex-1 pl-3 pr-5 pb-20 overflow-x-auto bg-primary-blue-950">
            <Header />
            <div className="pl-5 pr-4 bg-primary-blue-950">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};
