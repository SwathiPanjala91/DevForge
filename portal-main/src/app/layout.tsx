import { RootProvider } from "@/context/RootProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "JNTUH UCEJ Coding Club | Learn. Code. Compete. Rise.",
    template: "%s | JNTUH UCEJ Coding Club"
  },
  description: "The premium digital ecosystem for JNTUH UCEJ students to learn, practice, and compete in coding.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-white antialiased`}>
        <RootProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </RootProvider>
      </body>
    </html>
  );
}
