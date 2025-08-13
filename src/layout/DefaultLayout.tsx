import React, { useState, ReactNode } from "react";
import Header from "../components/Header/index";
import Sidebar from "../components/Sidebar/index";
import { NavigationItem } from "../constants/interface/NavigationItem";

const DefaultLayout: React.FC<{
  children: ReactNode;
  menuItems: NavigationItem[];
  rootPath: string;
}> = ({ children, menuItems, rootPath }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-slate-900 dark:text-bodydark bg-gray-100">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
          rootPath={rootPath}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl px-4 md:px-6 2xl:px-10 py-2 md:py-4 2xl:py-6">

              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
