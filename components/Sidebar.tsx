"use client";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Palette,
  Settings,
  Settings2,
  ShoppingCart,
  User,
  Users2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathName = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className={cn(
              "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            )}>
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings/user"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathName.includes("user") ? "bg-accent" : ""
                )}>
                <User className="h-5 w-5" />
                <span className="sr-only">User Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">User Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings/theme-color"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathName.includes("theme-color") ? "bg-accent" : ""
                )}>
                <Palette className="h-5 w-5" />
                <span className="sr-only">Theme Color Setting</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Theme Color Setting</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}

export default Sidebar;
