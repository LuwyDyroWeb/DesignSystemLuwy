import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
// import useDeviceScreen from "../hooks/useDeviceScreen";

export const DashboardLayout = () => {
  // const { width } = useDeviceScreen();
  // const isMobile = width !== undefined && width < 768;
  return (
    <>
      <div className="min-h-screen flex flex-col h-dvh">
        <div className="flex h-full ">
          <Sidebar />
          <main className="flex-1 pl-3 pr-5 overflow-x-auto bg-primary-bluedark-950">
            <Header />
            <div className="pl-5 pr-4">
              <Outlet />
            </div>
            {/* {!isMobile ? <Footer className="sticky -ml-3 -mr-5" /> : null} */}
            <div className="md:sticky bottom-0">
              <Footer className="-ml-3 -mr-5" />
            </div>
          </main>
          {/* {isMobile ? <Footer className="w-full fixed" /> : null} */}
          {/* <div className="fixed md:hidden bottom-0">
            <Footer className="w-full" />
          </div> */}
        </div>
      </div>
    </>
  );
};
