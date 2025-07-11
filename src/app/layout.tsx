import { GlobalProvider } from "@/context/GlobalContext";
import "./globals.css";
import { FlightProvider } from "@/context/FlightContext";
import { ErrorProvider } from "@/context/ErrorContext";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <GlobalProvider>
          <FlightProvider>
            <ErrorProvider>{children}</ErrorProvider>
          </FlightProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
