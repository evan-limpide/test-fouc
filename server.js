import express from 'express';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import theme from './theme';
import { TssCacheProvider } from 'tss-react';
import createEmotionCache from './createEmotionCache';
import createTssCache from './createTssCache';

function renderFullPage(html, css) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>My page</title>
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,800,900|Quicksand:100,200,300,400,500,600,700,800,900|Sriracha:100,200,300,400,500,600,700,800,900|Ubuntu:100,200,300,400,500,600,700,800,900" rel="stylesheet" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script async src="/build/bundle.js"></script>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const muiCache = createEmotionCache();
  const tssCache = createTssCache();

  // Render the component to a string.
  const emotionServers = [
    // Every emotion cache used in the app should be provided.
    // Caches for MUI should use "prepend": true.
    // MUI cache should come first.
    // createMuiCache(),
    tssCache,
    muiCache,
  ].map(createEmotionServer);
  
  const styleTagsAsStr = emotionServers.map(
    ({ extractCriticalToChunks, constructStyleTagsFromChunks }) =>
    constructStyleTagsFromChunks(extractCriticalToChunks(html))
  ).join("");
  
  // Send the rendered page back to the client.
  
  const html = ReactDOMServer.renderToString(
    <CacheProvider value={muiCache}>
        <TssCacheProvider value={tssCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
        </ThemeProvider>
      </TssCacheProvider>
    </CacheProvider>,
  );
  
  console.log(">> css created : ", styleTagsAsStr);
  res.send(renderFullPage(html, styleTagsAsStr));
}


const app = express();

app.use('/build', express.static('build'));

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${port}`);
});
