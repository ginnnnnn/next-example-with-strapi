import Head from "next/head";
import React, { FunctionComponent } from "react";
import NavBar from "./NavBar";
import Title from "./Title";
interface PageProps {
  title: string;
}

const Page: FunctionComponent<PageProps> = ({ title, children }) => (
  <>
    <Head>
      <title>{title} - Next Shop</title>
    </Head>
    <header>
      <NavBar />
    </header>
    <main className="px-6 py-4">
      <Title>{title}</Title>
      {children}
    </main>
  </>
);

export default Page;
