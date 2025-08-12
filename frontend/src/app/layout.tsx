import "@/app/globals.css";
import { Topbar }     from "@/components/Topbar";
import StatusBar from "@/components/StatusBar";


export const metadata = { title: "Stirweld HMI" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex flex-col h-full bg-gray-100">
        <Topbar />
        <StatusBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
