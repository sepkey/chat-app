import { PropsWithChildren } from "react";
import Header from "./layout-components/Header";
import Content from "./layout-components/Content";

function LayoutProvider({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

export default LayoutProvider;
