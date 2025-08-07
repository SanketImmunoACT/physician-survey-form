 //"use client";
import "./styles/globals.css";
import { Mukta } from "next/font/google";
import { Toaster } from "react-hot-toast";
 
const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Physician Survey Form",
  description: "Created by ImmunoACT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth hydrated">
      <body className={`${mukta.className} bg-background text-foreground`}>
        {children} 
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
