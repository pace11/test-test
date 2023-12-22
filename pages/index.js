import Button from "@/components/Button";
import Layout from "@/layout";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/hello/1");
        const data = await response.json();
        console.log("data => ", data);
      } catch (error) {}
    }
  }, []);

  return (
    <Layout>
      <main className={`${styles.main}`}>
        <Button />
      </main>
    </Layout>
  );
}
