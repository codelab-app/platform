/* eslint-disable react/jsx-props-no-spreading */
/*
In production the stylesheet is compiled to .next/static/style.css and served from /_next/static/style.css
You have to include it into the page using either next/head or a custom _document.js, as is being done in this file.
*/
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type { DocumentContext } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      })

    const initialProps = await Document.getInitialProps(ctx)
    const style = extractStyle(cache, true)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style dangerouslySetInnerHTML={{ __html: style }} />
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link
            crossOrigin=""
            href="https://fonts.gstatic.com"
            rel="preconnect"
          />
          {/*
            normal: 400
            bold: 700
            black: 900
          */}
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Nunito:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              // eslint-disable-next-line @typescript-eslint/naming-convention
              /**
               * In case you're wondering why we have this script here. Toggling the readOnly in this line, caused the editor js to spit some errors that crashed the app. Fortunately, even with these errors, I could still use editor js normally. From reading around the internet, I concluded that these errors were just some undefined state not handled correctly. Anyway, we can only wait for editor js team to fix these errors so I figured we could just ignore these errors for now.
               *
               * And if you're wondering why the script is placed here, it's because putting it in other locations won't work. Next.js has a built-in script that catches all errors and displays them to users. We aim to intercept these errors before Next.js does.
               */
              __html: `
            window.addEventListener('error', event => {
              if(event.filename.includes('editorjs')) {
                event.stopImmediatePropagation()
              }
            })
          `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
