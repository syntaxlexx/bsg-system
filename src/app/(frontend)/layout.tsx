import { PropsWithChildren } from "react";
import Header from "./header";
import Footer from "./footer";

interface Props extends PropsWithChildren {}

const Layout = async ({ children }: Props) => {
  return (
    <div>
      <Header />

      <main className="min-h-[60vh]">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
