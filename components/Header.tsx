import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { selectSignups } from "@/redux/slices/users";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { redColor } from "@/colors/brandColor/red";
import { updateCSSVariables } from "@/colors/updateColor";

export default function Header() {
  const { setTheme, theme, themes } = useTheme();
  const router = useRouter();
  const selector = useSelector((state: RootState) => selectSignups(state));
  const onLogout = () => {
    deleteCookie("userId");
    router.replace("/auth/sign-in");
  };
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/"
          className="text-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Dashboard
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {/*Beginning of Dark Mode Toggle*/}
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {themes.map((theme) => {
              return (
                <DropdownMenuItem
                  className="text-transform: capitalize"
                  onClick={() => setTheme(theme)}>
                  {theme}
                </DropdownMenuItem>
              );
            })}
            {/* <DropdownMenuItem
              className="text-transform: capitalize"
              onClick={() => updateCSSVariables(theme === "dark", "rose")}>
              Red
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"/settings/user"}>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/*End of Dark Mode Toggle*/}
    </header>
  );
}
