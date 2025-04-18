import ReduxProvider from "@/store/redux-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trvalé příkazy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
