import Head from "next/head";
import Link from "next/link";

const Layout = ({ children, metaTitle, metaDesc }) => {
  return (
    <>
      <Head>
        <title>{`Create Next App ${metaTitle || "Home"}`}</title>
        <meta name="description" content={`Description: ${metaDesc || ""}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
      </div>
      {children}
    </>
  );
};

export default Layout;
