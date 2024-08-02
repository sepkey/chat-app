"use client";
import store from "@/redux/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
