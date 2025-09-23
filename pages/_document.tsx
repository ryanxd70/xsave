import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  // Fix: Add getInitialProps to help TypeScript correctly infer props for the component.
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    const favicon = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><style>path{fill:%233B82F6}@media (prefers-color-scheme:dark){path{fill:%2360A5FA}}</style><path d='M5 2L9 2L19 22L15 22Z'/><path d='M15 2L19 2L9 22L5 22Z'/></svg>";

    return (
      <Html lang={this.props.locale || 'en'}>
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
