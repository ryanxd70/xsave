import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  // Fix: Explicitly return the locale from getInitialProps to ensure TypeScript
  // can correctly infer the 'locale' property on the component's props.
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    // FIX: The `locale` property is available on `this.props`.
    // To work around a TypeScript error where `props` is not recognized on the
    // `MyDocument` subclass, we cast `this` to the base `Document` type, which
    // is known to have a `props` property.
    const locale = (this as Document).props.locale;

    return (
      <Html lang={locale || 'en'}>
        <Head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
