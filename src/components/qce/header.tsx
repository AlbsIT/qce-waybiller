import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBatch } from "@/lib/batch";
import { BlobProvider } from "@react-pdf/renderer";
import { PrintDocument } from "../print";
import { printPdf } from "@/lib/actions";

export const Header = () => {
  const batch = useBatch();

  return (
    <header className="max-h-24 border-b w-screen p-5 flex flex-row items-center justify-between">
      <section className="flex flex-col">
        <h1 className="!text-xl font-bold">QCE Waybiller</h1>
      </section>

      <section className="flex flex-row gap-5">
        <Button variant="secondary" onClick={batch.new}>
          Create empty form
        </Button>
        <Button
          variant="secondary"
          onClick={() => batch.remove(batch.currentItemInView)}
        >
          Remove current from batch
        </Button>
        <div className="border-l pl-5 flex flex-row items-center gap-3">
          <Button
            size="sm"
            className="h-6"
            variant="ghost"
            onClick={batch.prev}
          >
            <ChevronLeft />
          </Button>
          <div>
            <p className="text-xs text-neutral-500">Currently Viewing</p>
            <p>{batch.itemCount > 0 ? batch.currentItemInView + 1 : 0}</p>
          </div>
          <Button
            size="sm"
            className="h-6"
            variant="ghost"
            onClick={batch.next}
          >
            <ChevronRight />
          </Button>
        </div>
        <div className="border-l pl-5">
          <p className="text-xs text-neutral-500">Batch Date</p>
          <p>{batch.batchDate.toDateString()}</p>
        </div>
        <div className="border-l pl-5">
          <p className="text-xs text-neutral-500">Items in batch</p>
          <p>{batch.itemCount}</p>
        </div>
        <div className="border-l pl-5 space-x-1">
          <Button variant="outline">Batch Import</Button>
          {batch.items.length > 0 && (
            <BlobProvider document={<PrintDocument useCurrent={false} />}>
              {({ blob }) => (
                <Button onClick={() => printPdf(blob)}>Print</Button>
              )}
            </BlobProvider>
          )}
        </div>
      </section>
    </header>
  );
};
