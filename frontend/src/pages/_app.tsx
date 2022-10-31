import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { withTRPC } from '@trpc/next';
import { ServerRouter } from '../server/router';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

    return {
      url,
      headers: {
        'x-ssr': '1'
      }
    };
  },
  ssr: true
})(App);
