"use client";

import Header from "@/app/components/Header";
import TableComponent from "@/app/components/TableComponent";
import ReduxProvider from "@/store/redux-provider";

export default function Home() {
  return (
    <>
      <ReduxProvider>
        <Header></Header>
        <TableComponent />
      </ReduxProvider>
    </>
  );
}
