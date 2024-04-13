"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "System Logs",
    href: "/admin/system-logs",
  },
];

interface Props {}

const Navigation: FC<Props> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <ul className="space-y-2 w-full">
            {navItems.map((navItem) => {
              const isActive =
                (navItem.href === "/admin" && pathname == navItem.href) ||
                (navItem.href !== "/admin" &&
                  pathname.startsWith(navItem.href));

              return (
                <li key={navItem.href} className="w-full">
                  <Link
                    href={navItem.href}
                    className={cn(
                      "py-1 rounded-full px-4 transition w-full group flex justify-between items-center",
                      {
                        "bg-gray-200 text-black": isActive,
                        "group-hover:bg-gray-100 text-gray-700 group-hover:text-black": !isActive,
                      }
                    )}
                  >
                    <span>{navItem.title}</span>
                    <span
                      className={cn("opacity-0 group-hover:opacity-100", {
                        "opacity-100": isActive,
                      })}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Navigation;
