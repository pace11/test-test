/* eslint-disable import/order */
import Button from "@/components/Button";
import Layout from "@/layout";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/hello/1");
        console.log("data => ", response);
      } catch (error) {}
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <main className={`${styles.main}`}>
        <Button />
        <p>INI BARU DITAMBAH update</p>
      </main>
    </Layout>
  );
}
