/*
In production the stylesheet is compiled to .next/static/style.css and served from /_next/static/style.css
You have to include it into the page using either next/head or a custom _document.js, as is being done in this file.
*/

import type { DocumentContext } from 'next/document'

import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    // const isMenuOpen = useRecoilValue(menuState)

    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
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
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Roboto:wght@300;400&family=Nunito:wght@300;400;500;600&family=IBM+Plex+Sans+Thai&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            rel="stylesheet"
            type="text/css"
          />
          {/* <style */}
          {/*  data-emotion-css={this.props.ids.join(' ')} */}
          {/*  dangerouslySetInnerHTML={{ __html: this.props.css }} */}
          {/*/ > */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
