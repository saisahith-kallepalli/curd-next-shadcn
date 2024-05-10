"use client";
import { updateCSSVariables } from "@/colors/updateColor";
import { selectColor } from "@/redux/slices/themeColors";
import { RootState } from "@/redux/store";
import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function withoutAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const selector = useSelector((state: RootState) => selectColor(state));

    useEffect(() => {
      updateCSSVariables(selector.themeColor);
    }, [selector.themeColor]);

    const router = useRouter();
    const isAuthenticated = (): boolean => {
      return hasCookie("userId");
    };
    const isUserAuthenticated = isAuthenticated();

    if (isUserAuthenticated) {
      router.replace("/");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
}

export default withoutAuth;
