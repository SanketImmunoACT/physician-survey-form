// "use client";
import "@/app/styles/globals.css";
import { Mukta } from "next/font/google";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Physician Survey Form",
  description: "Created by ImmunoACT",
};

/**
 * Root layout for the entire app.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth hydrated">
      <body className={`${mukta.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
