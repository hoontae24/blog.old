import Document, { Html, Head, Main, NextScript } from "next/document"
import GA from "../components/GooglaAnalytics"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <GA />
          <link href="/icons/favicon.ico" rel="shortcut icon" />
          <link href="/icons/favicon.ico" rel="icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
