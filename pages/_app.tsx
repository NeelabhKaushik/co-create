import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import "react-toastify/dist/ReactToastify.min.css";
import ModalManager from "@/components/ModalManager";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className="bg-[#03040B] flex flex-col items-center justify-center p-10 min-h-screen">
      <Head>
        <title>Co-Create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ToastContainer />
        <ModalManager />
        <Component {...pageProps} />
      </RecoilRoot>
    </main>
  );
};

export default App;
