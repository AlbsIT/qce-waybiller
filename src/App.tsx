"use client";

import "./App.css";
import { PrintForm } from "./components/qce/print-form";
import { NoItemInBatch } from "./components/qce/no-item-in-batch";
import { Header } from "./components/qce/header";
import { useBatch } from "./lib/batch";
import { Button } from "./components/ui/button";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { printPdf } from "./lib/actions";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { PrintDocument } from "./components/print";

function App() {
  const batch = useBatch();

  return (
    <main>
      <Header />

      <section className="self-stretch p-4">
        {batch.itemCount > 0 ? (
          <PrintForm batch={batch}/>
        ) : (
          <NoItemInBatch />
        )}
      </section>

      <div className="shadow-md bg-white fixed bottom-2 right-2 w-fit p-4 border rounded-md flex flex-col items-center gap-2">
        <b>Currently viewing item:</b>
        <div className="text-lg flex flex-row items-center w-full justify-between">
          <Button
            size="sm"
            className="h-6"
            variant="ghost"
            onClick={batch.prev}
          >
            <ChevronLeft />
          </Button>
          <p>{batch.itemCount > 0 ? batch.currentItemInView + 1 : 0}</p>
          <Button
            size="sm"
            className="h-6"
            variant="ghost"
            onClick={batch.next}
          >
            <ChevronRight />
          </Button>
        </div>

        {batch.items.length > 0 && (
          <BlobProvider document={<PrintDocument useCurrent={true} />}>
            {({ blob }) => (
              <Button className="w-full" onClick={() => printPdf(blob)}>
                Print <Printer />
              </Button>
            )}
          </BlobProvider>
        )}
      </div>

      {batch.items.length > 0 && (
        <PDFViewer>
          <PrintDocument useCurrent={false} />
        </PDFViewer>
      )}
    </main>
  );
}

export default App;
