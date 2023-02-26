import "../styles/globals.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { ContextProvider } from "../context/contextProvider";
import { Navbar } from "../components";

const getLibrary = (provider) => new Web3Provider(provider);

const App = ({ Component, pageProps }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ContextProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-slate-800 bg-white min-h-screen">
          <Navbar />
          <div className="pt-65 no-scrollbar overflow-x-hidden max-w-screen">
            <Component {...pageProps} />
          </div>
        </div>
        <Script
          src="https://kit.fontawesome.com/9555f8b288.js"
          crossOrigin="anonymous"
        />
      </ThemeProvider>
    </ContextProvider>
  </Web3ReactProvider>
);
export default App;
