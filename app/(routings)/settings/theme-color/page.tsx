"use client";
import { updateCSSVariables } from "@/colors/updateColor";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { changeThemeColor, selectColor } from "@/redux/slices/themeColors";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
// import ColorPicker from "@/components/color-picker";
import "react-color-palette/css";
import { useDispatch, useSelector } from "react-redux";
const themesColors: any = {
  zinc: "#52525b",
  slate: "#475569",
  stone: "#57534e",
  gray: "#4b5563",
  natural: "#525252",
  red: "#dc2626",
  rose: "#e11d48",
  orange: "#ea580c",
  green: "#22c55e",
  blue: "#3b82f6",
  yellow: "#facc15",
  violet: "#6d28d9",
};
function Page() {
  // const [color, setC olor] = useColor("#561ecb");
  const selector = useSelector((state: RootState) => selectColor(state));
  const dispatch = useDispatch();
  useEffect(() => {
    updateCSSVariables(selector.themeColor);
  }, [selector.themeColor]);

  return (
    <div className="flex min-h-screen w-full flex-col text-muted-foreground/60">
      <Sidebar />
      <div className="flex flex-col m-2 sm:gap-4 sm:py-4 sm:pl-14 ">
        <h1 className="text-5xl px-9 pt-7 flex-1 shrink-0 whitespace-nowrap font-semibold tracking-tight sm:grow-0">
          Pick Color Theme
        </h1>
        <h3 className="text-2xl text-muted-foreground/40 px-7 pt-7 flex-1 shrink-0 whitespace-nowrap font-semibold tracking-tight sm:grow-0">
          Picked Color:
        </h3>
        <Card
          className={`ml-7 flex justify-center items-center h-20 w-40`}
          style={{ backgroundColor: themesColors[selector.themeColor] }}>
          <CardTitle> {selector.themeColor}</CardTitle>
        </Card>
        <div className="grid grid-cols-2 sm:gap-4 sm:py-4 sm:pl-7 ">
          {Object.keys(themesColors).map((key) => (
            <Card
              key={key}
              className="flex justify-center items-center my-auto h-20 cursor-pointer capitalize"
              style={{ backgroundColor: themesColors[key] }}
              onClick={() => dispatch(changeThemeColor(key))}>
              <CardTitle>{key}</CardTitle>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
