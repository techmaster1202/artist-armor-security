import { LucideHome, User, Users } from "lucide-react";
import { NavigationItem } from "../interface/NavigationItem";

export const menuItems : NavigationItem[] = [
  {
    label: "Dashboard",
    to: "/admin",
    pathname: "/admin",
    icon: <LucideHome width={18} height={18} />,
  },
  {
    label: "Property",
    to: "/admin/property",
    pathname: "/admin/property",
    icon: <User width={18} height={18} />,
    subMenu: [
      {
        label: "All Property",
        to: "/admin/property/all",
        pathname: "/admin/property/all",
        icon: <User width={18} height={18} />,
      },
    ]
  },
  {
    label: "Types",
    to: "/admin/types",
    pathname: "/admin/types",
    icon: <User width={18} height={18} />,
    subMenu: [
      {
        label: "Add New Menu",
        to: "/admin/types/add",
        pathname: "/admin/types/add",
        icon: <User width={18} height={18} />,
      },
      {
        label: "Menu List",
        to: "/admin/types/list",
        pathname: "/admin/types/list",
        icon: <User width={18} height={18} />,
      },
      {
        label: "Categories",
        to: "/admin/types/category",
        pathname: "/admin/types/category",
        icon: <User width={18} height={18} />,
      },
    ]

  },
  {
    label: "Customer",
    to: "/admin/customer",
    pathname: "/admin/customer",
    icon: <Users width={18} height={18} />,
    subMenu: [
      {
        label: "All Customer",
        to: "/admin/customer/all",
        pathname: "/admin/customer/all",
        icon: <User width={18} height={18} />,
      },
    ]

  },
  {
    label: "Analytics",
    to: "/admin/analytics",
    pathname: "/admin/analytics",
    icon: <Users width={18} height={18} />,
    subMenu: [
      {
        label: "All Analytics",
        to: "/admin/analytics/all",
        pathname: "/admin/analytics/all",
        icon: <User width={18} height={18} />,
      },
    ]

  },
];
