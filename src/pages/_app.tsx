import 'normalize.css';
import { AppProps } from 'next/app';
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import './styles.scss';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
