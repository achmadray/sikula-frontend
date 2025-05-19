/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IconHome,
  IconChecklist,
  IconCashRegister,
  IconBellRinging,
  IconUser,
} from "@tabler/icons-react";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LoadingScreen } from "../elements";
import { NavItem } from "../navigation/BottomNav/NavItem";

const navigationsleft = [
  { title: "Home", href: "/", icon: IconHome },
  { title: "Riwayat", href: "/history", icon: IconChecklist },
];

const navigationsright = [
  { title: "Kasir", href: "/kasir", icon: IconCashRegister },
  { title: "Notifikasi", href: "/notification", icon: IconBellRinging },
  { title: "Profil", href: "/profile", icon: IconUser },
];

export const HomeLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [currentPath, setCurrentPath] = useState(path || "/");

  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  return (
    <div className="max-w-md min-h-screen pb-14 mx-auto bg-gradient-to-t from-[#f2f8fd] via-[#f6f9fc] to-[#f6f9fc] relative overflow-y-auto overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>

      <footer className="fixed max-w-md w-full z-50 bottom-0 shadow-md bg-white border-t border-gray-100 flex items-center justify-around py-2.5">
        {navigationsleft.map((navigation) => (
          <NavItem
            key={navigation.title}
            {...navigation}
            currentPath={currentPath}
          />
        ))}

        {navigationsright.map((navigation) => (
          <NavItem
            key={navigation.title}
            {...navigation}
            currentPath={currentPath}
          />
        ))}
      </footer>
    </div>
  );
};
