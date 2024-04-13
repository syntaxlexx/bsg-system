import { PropsWithChildren } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { siteInfo } from "@/lib/constants";

interface Props extends PropsWithChildren {}

const Layout = async ({ children }: Props) => {
  return (
    <div>
      <div>{children}</div>

      {siteInfo.googleTrackingId.length > 1 ? (
        <GoogleTagManager gtmId={siteInfo.googleTrackingId} />
      ) : null}
    </div>
  );
};

export default Layout;
