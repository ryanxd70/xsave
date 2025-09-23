import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  // By explicitly typing the return value of getInitialProps, we ensure TypeScript
  // correctly infers the props for the MyDocument component, resolving the error.
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    const favicon = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><style>path{fill:%233B82F6}@media (prefers-color-scheme:dark){path{fill:%2360A5FA}}</style><path d='M5 2L9 2L19 22L15 22Z'/><path d='M15 2L19 2L9 22L5 22Z'/></svg>";
    const currentLocale = this.props.locale || 'en';

    return (
      <Html lang={currentLocale}>
        <Head>
          <link rel="icon" href={favicon} />
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
