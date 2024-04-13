import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const Layout = async ({ children }: Props) => {
  return (
    <div>
      <header className="bg-white font-semibold text-lg text-center">
        ADMIN AREA
      </header>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
