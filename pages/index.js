import Button from "@/components/Button";
import Layout from "@/layout";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <main className={`${styles.main}`}>
        <Button />
      </main>
    </Layout>
  );
}
