import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Printable Math Worksheets & Quizzes | BalloonVerse",
  description: "Download free printable math worksheets, classroom quizzes, and teacher templates. Practice addition, subtraction, times tables, and division offline.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
