/*
In production the stylesheet is compiled to .next/static/style.css and served from /_next/static/style.css
You have to include it into the page using either next/head or a custom _document.js, as is being done in this file.
*/

import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: any) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   const page = await ctx.renderPage()
  //   const styles = extractCritical(page.html)
  //
  //   return { ...initialProps, ...page, ...styles }
  // }

  render() {
    return (
      <Html>
        <Head>
          {/* <style*/}
          {/*  data-emotion-css={this.props.ids.join(' ')}*/}
          {/*  dangerouslySetInnerHTML={{ __html: this.props.css }}*/}
          {/*/ >*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
