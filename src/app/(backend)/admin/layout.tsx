import { PropsWithChildren } from "react";
import Navigation from "./navigation";

interface Props extends PropsWithChildren {}

const Layout = async ({ children }: Props) => {
  return (
    <div className="mt-8">
      <div className="container">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-64">
            <Navigation />
          </div>

          <div className="w-full md:flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
