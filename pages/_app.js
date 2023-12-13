import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  console.log("ini dirender gak ya ");
  return <Component {...pageProps} />;
}
