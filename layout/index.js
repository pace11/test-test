import Head from "next/head";

const Layout = ({ children, metaTitle, metaDesc }) => {
  return (
    <>
      <Head>
        <title>{`Create Next App ${metaTitle || "Home"}`}</title>
        <meta name="description" content={`Description: ${metaDesc || ""}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
