import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import { config } from '../utils/config'

//meta tags: https://ogp.me/
export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
        <meta property="og:url" content={config.domain} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:image" content="https://www.example.com/og-image.jpg" />
        <meta property="og:site_name" content={config.name} />
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@site" />
        <meta name="twitter:creator" content="@handle" /> */}
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
