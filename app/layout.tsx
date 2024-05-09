"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Header from "@/components/Header";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/Footer";
// import "@radix-ui/themes/styles.css";
// import '@radix-ui/themes/layout/tokens.css';
// import '@radix-ui/themes/layout/components.css';
// import '@radix-ui/themes/layout/utilities.css';
// import { Theme, ThemePanel } from "@radix-ui/themes";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          inter.variable
        )}>
        <div id="layout">
          <Provider store={store}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
              enableColorScheme>
              {!pathName.includes("auth") && <Header />}
              {children}
              {<Footer />}
            </ThemeProvider>
          </Provider>
        </div>
      </body>
    </html>
  );
}
