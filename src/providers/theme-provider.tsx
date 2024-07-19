"use client";

import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#13b48e",
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 45,
            boxShadow: "none",
            colorPrimaryBgHover: "#13b48e",
            colorPrimaryHover: "#13b48e",
            controlOutline: "none",
            colorBorder: "#13b48e",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
