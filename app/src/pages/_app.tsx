import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { withTRPC } from '@trpc/next';
import { ServerRouter } from '../server/router';
import { MoralisProvider } from 'react-moralis';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  components: {
    Steps,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MoralisProvider initializeOnMount={false}>
        <Component {...pageProps} />
      </MoralisProvider>
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
