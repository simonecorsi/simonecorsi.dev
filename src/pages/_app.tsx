import "normalize.css";
import { AppProps } from "next/app";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import { DarkMode } from "../components/DarkMode";
import useDarkMode from "use-dark-mode";

export default function App({ Component, pageProps }: AppProps) {
  return <DarkMode useDarkMode={useDarkMode()}><Component {...pageProps} /></DarkMode>;
  
}
