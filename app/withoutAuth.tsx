"use client";
import { hasCookie } from "cookies-next";

import { useRouter } from "next/navigation";
import React from "react";

function withoutAuth(WrappeComponent: React.ComponentType) {
  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = (): boolean => {
      return hasCookie("userId");
    };
    const isUserAuthenticated = isAuthenticated();

    if (isUserAuthenticated) {
      router.replace("/");
      return null;
    } else {
      return <WrappeComponent {...props} />;
    }
  };
}

export default withoutAuth;
