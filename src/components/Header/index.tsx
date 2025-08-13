import {
  Bell,
  Calendar,
  ChevronDown,
  Mail,
  Menu,
  MessageCircleMore,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../common/ui/button";
import DropdownUser from "./DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <nav className="sticky top-0 z-[50] w-full bg-gray-100">
      <div className="flex items-center justify-between px-4 py-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-gray-200 bg-white p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <Menu size={20} />
            </span>
          </button>
        </div>

        <Button variant={"default"} className="flex gap-2 rounded-3xl">
          <Calendar size={20} className="text-white" />
          <p className="text-white">Agenda (24)</p>
        </Button>

        {/* Search Bar */}
        <div className="hidden md:flex relative mx-auto max-w-md w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here"
              className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
            />
            <Search
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-5">
          <ul className="flex items-center gap-4 2xsm:gap-6 mr-10">
            {/* Notification Icons */}
            <li className="relative">
              <Link
                to="#"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <span className="absolute -top-0.5 right-0.5 z-1 h-5 w-5 rounded-full bg-blue-500 border-2 border-gray-100 flex items-center justify-center text-[10px] text-white">
                  4
                </span>
                <Bell size={20} className="text-gray-600" />
              </Link>
            </li>

            <li className="relative">
              <Link
                to="#"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <span className="absolute -top-0.5 right-0.5 z-1 h-5 w-5 rounded-full bg-green-500 border-2 border-gray-100 flex items-center justify-center text-[10px] text-white">
                  5
                </span>
                <Mail size={20} className="text-gray-600" />
              </Link>
            </li>

            <li className="relative">
              <Link
                to="#"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <span className="absolute -top-0.5 right-0.5 z-1 h-5 w-5 rounded-full bg-orange-500 border-2 border-gray-100 flex items-center justify-center text-[10px] text-white">
                  5
                </span>
                <MessageCircleMore size={20} className="text-gray-600" />
              </Link>
            </li>
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}

          {/* Language Selector */}
          <ul className="flex items-center gap-4 2xsm:gap-6 mx-2 bg-white px-3 py-2 rounded-full">
            <li className="hidden md:block">
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-sm font-medium text-gray-500">EN</span>
                <ChevronDown size={20} className="text-blue-500" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
