import Layout from "@/layout";

export default function NotesDetail({ note }) {
  // console.log('data = > ', note)
  return (
    <Layout>
      <div>
        <h5>title: {note?.data?.title}</h5>
        <p>desc: {note?.data?.description}</p>
      </div>
    </Layout>
  );
}
