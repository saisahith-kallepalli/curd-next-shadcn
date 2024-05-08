"use client";
import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React from "react";

function withAuth(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = (): boolean => {
      return hasCookie("userId");
    };
    const isUserAuthenticated = isAuthenticated();

    if (!isUserAuthenticated) {
      router.replace("/auth/sign-in");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
