import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ReactQuery } from "@/providers/ReactQuery";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s | Movie App",
    default: "Movie App",
  },
  description: "Movie App Imdb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieInfo = await cookies();
  const currentTheme =
    cookieInfo?.get("theme")?.value == "true" ? "night" : "light";
  return (
    <html lang="en" data-theme={currentTheme}>
      <body className={`antialiased`}>
        <ReactQuery>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReactQuery>
      </body>
    </html>
  );
}
