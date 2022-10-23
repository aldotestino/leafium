import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme} resetCSS>
    <Component {...pageProps} />
  </ChakraProvider>;
}

export default App;
