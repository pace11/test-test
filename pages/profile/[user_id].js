/* eslint-disable import/order */
import Layout from "@/layout";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const user = {
    1: {
      name: "Umar",
      age: 28,
    },
    2: {
      name: "Pace",
      age: 28,
    },
  };

  const userDetail = user[router.query.user_id] ?? null;

  return (
    <Layout metaTitle="Profile" metaDesc="isi dari profile user yg login">
      <div>
        <p>{router.asPath}</p>
        <h3>ini halaman profile dari : {JSON.stringify(userDetail)}</h3>
      </div>
      <button type="button" onClick={() => router.back()}>
        Kembali
      </button>
    </Layout>
  );
}

export default Profile;
