import * as React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import App from './App';
import theme from './theme';
import createEmotionCache from './createEmotionCache';
import createTssCache from './createTssCache';
import { TssCacheProvider } from 'tss-react';


const muiCache = createEmotionCache();
const tssCache = createTssCache();
function Main() {
  return (
    <CacheProvider value={muiCache}>
      <TssCacheProvider value={tssCache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </TssCacheProvider >
    </CacheProvider>
  );
}

ReactDOM.hydrateRoot( document.querySelector('#root'), <Main />);
