"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../../app/StoreProvider";
export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <StoreProvider>
        <SessionProvider>{children}</SessionProvider>
      </StoreProvider>
    </>
  );
};
