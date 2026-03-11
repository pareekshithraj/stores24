import type { Metadata } from "next";
import "./globals.css";
import AppChrome from "@/components/AppChrome";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL('https://bluevolt.in'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "BlueVolt | Next-Gen Digital Infrastructure",
    template: "%s | BlueVolt",
  },
  description: "BlueVolt Groups Private Limited builds the foundation for the future of digital infrastructure and educational technology.",
  keywords: ["BlueVolt", "Digital Infrastructure", "Educational Technology", "EdTech", "Cloud Engineering", "Enterprise Solutions"],
  authors: [{ name: "BlueVolt Group" }],
  creator: "BlueVolt",
  publisher: "BlueVolt Groups Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "BlueVolt | Next-Gen Digital Infrastructure",
    description: "BlueVolt Groups Private Limited builds the foundation for the future of digital infrastructure and educational technology.",
    url: "https://bluevolt.in",
    siteName: "BlueVolt",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueVolt | Next-Gen Digital Infrastructure",
    description: "Building the foundation for the future of digital infrastructure and educational technology.",
    creator: "@BlueVoltGroup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bluevolt Groups Private Limited",
  "url": "https://bluevolt.group",
  "logo": "https://bluevolt.group/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Pareekshith Raj"
  },
  "sameAs": [
    "https://www.linkedin.com/company/bluevolt-groups",
    "https://www.crunchbase.com/organization/bluevolt-groups"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="yama-container">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <AppChrome>{children}</AppChrome>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
