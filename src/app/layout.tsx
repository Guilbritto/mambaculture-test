import "./globals.css";
import { Header } from "@/components/header";
import { Modal } from "@/components/modal";
import { ModalProvider } from "@/context/useModal";
import { Toaster } from "@/components/ui/toaster";
import { CampainProvider } from "@/context/useCampain";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CampainProvider>
          <ModalProvider>
            <Header />
            <div className="container h-screen mx-auto pt-5">
              {children}
            </div>
            <Modal />
            <Toaster />
          </ModalProvider>
        </CampainProvider>
      </body>
    </html>
  );
}
