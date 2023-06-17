import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  })
  return <Component {...pageProps} />;
};

export default MyApp;
