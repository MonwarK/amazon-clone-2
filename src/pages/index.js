import Aos from "aos";
import Head from "next/head";
import { useEffect } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import Sidebar from "../components/Sidebar"

export default function Home({products}) {

  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header products={products}/>

      <main className="max-w-screen-2xl mx-auto">

        {/* Banner */}
        <Banner />

        {/* Product Feed */}
        <ProductFeed products={products}/>

      </main>

    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())

  return {
    props: {
      products,
    }
  }

}
