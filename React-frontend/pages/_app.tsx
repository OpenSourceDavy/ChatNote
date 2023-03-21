import '@/styles/globals.css'
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

// Disable strict mode
MyApp.defaultProps = {
  ...MyApp.defaultProps,
  strictMode: false,
};
