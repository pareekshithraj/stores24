import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BlueVolt POS",
  description: "BlueVolt POS Supermarket + ERP platform.",
};

export default function Stores24PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
