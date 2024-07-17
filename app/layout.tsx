import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEBRONIC | Android App Development | Website Development | Software Development | Social Media Marketing | Top App & Website Design and Development Company",
  description: `WEBRONIC is incorporated to offer a comprehensive range of Website design, Web Development, Rich Internet Applications, Content Management Systems Development, Internet Marketing, Portal Development, Logo Design, Brochure Design, e-Learning Portal Development, Search Engine Optimization, Social media marketing services, Branding, Creative Graphics, mobile application development solutions which are market driven, cost-effective, and highest quality standards.

We have the knowledge and ability to get your company on the first page of the major search engines in the organic listings both within your budget and within all search engine guidelines all without paying per click.

It is our commitment that our web development team will be fully accessible to our clients during each and every phase of the web design project and will dedicate its time and skill to ensure the project's success. It's that personal commitment to excellence that separates us from other web development companies or automated web template services.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
