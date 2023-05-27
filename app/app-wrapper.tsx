"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { Toaster } from "react-hot-toast";

interface ToastProps {
  children?: React.ReactNode;
}

const AppWrapper: FC<ToastProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </>
  );
};

export default AppWrapper;
