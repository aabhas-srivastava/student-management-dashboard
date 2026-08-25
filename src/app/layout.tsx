import type { Metadata } from "next";
import Providers from "@/src/components/Providers";

export const metadata: Metadata = {
  title: "Student Management Dashboard",
  description: "React + TypeScript Assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}