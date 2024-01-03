import Layout from "@/layout";

export default function Products({ products }) {
  return (
    <Layout>
      {products?.products?.map((item) => (
        <div style={{ border: "1px solid black", marginBottom: "10px" }}>
          <h5>{item.title}</h5>
          <p>{item.description}</p>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://dummyjson.com/products");
  const products = await res.json();
  return { props: { products } };
}
