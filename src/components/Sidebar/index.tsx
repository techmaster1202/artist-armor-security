import { ChevronRight, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationItem } from "../../constants/interface/NavigationItem";
import { isActivePath } from "../../lib/utils";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  menuItems: NavigationItem[];
  rootPath: string;
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  menuItems,
  rootPath,
}: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // State to track which submenu is open
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  // Toggle submenu visibility
  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[50] flex h-screen w-72 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex items-center justify-between gap-2 px-6 pt-5">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-500 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="24"
              height="24"
            >
              <path d="M21 8.59V4c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v4.59c0 .89.34 1.74.96 2.38l6.07 6.39c.57.6 1.35.94 2.18.94s1.61-.34 2.18-.94l6.07-6.39c.62-.64.96-1.49.96-2.38z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">griya.</span>
        </div>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500">
              MAIN MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <SidebarItem
                    label={item.label}
                    to={item.to}
                    icon={item.icon}
                    isActive={
                      item.subMenu
                        ? pathname.startsWith(item.pathname)
                        : isActivePath(pathname, rootPath, item.pathname)
                    }
                    subMenu={item.subMenu}
                    isOpen={openSubMenu === item.label}
                    toggleSubMenu={() => toggleSubMenu(item.label)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Promotional Banner */}
      <div className="mt-auto mx-4 mb-4 bg-blue-500 p-4 rounded-lg">
        <div className="flex items-center">
          
          <div>
            <p className="text-sm font-medium text-white">
              Generate monthly report more easier than before
            </p>
            <button className="mt-2 text-xs font-medium text-black bg-white px-3 py-1 rounded-md">
              Learn more
            </button>
          </div>
          <div className="flex-shrink-0 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-xs">
        <p className="text-gray-700 font-medium">Griya Real Estate Admin</p>
        <p className="mt-1 text-gray-400">© 2020 All Rights Reserved</p>
        <p className="mt-3 text-gray-400">Made with ♥ by Peterdraw</p>
      </div>
    </aside>
  );
};

export default Sidebar;

const SidebarItem = ({
  to,
  icon,
  label,
  isActive,
  subMenu,
  isOpen,
  toggleSubMenu,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
  isActive: boolean;
  subMenu?: NavigationItem[];
  isOpen: boolean;
  toggleSubMenu: () => void;
}) => (
  <div>
    <NavLink
      to={to}
      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:text-blue-500 hover:bg-gray-100 ${
        isActive ? "text-blue-500" : "text-gray-500"
      }`}
      onClick={subMenu ? toggleSubMenu : undefined}
    >
      {icon}
      {label}
      {subMenu && (
        <span className="ml-auto">
          {isOpen ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
        </span>
      )}
    </NavLink>
    {subMenu && isOpen && (
      <ul className="ml-6 mt-2 flex flex-col gap-2">
        {subMenu.map((subItem) => (
          <li key={subItem.to}>
            <NavLink
              to={subItem.to}
              className={`flex items-center gap-2 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out text-gray-500 hover:text-blue-500 `}
            >
              {subItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    )}
  </div>
);
