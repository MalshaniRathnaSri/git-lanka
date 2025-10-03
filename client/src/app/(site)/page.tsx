import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Richard Sanches",
  description: "E-commerce website for Online Clothing Store",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
