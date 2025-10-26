import type { PrintFormSchema } from "./types";
import * as xlsx from 'xlsx';

export const printPdf = (blob: Blob | null) => {
  if (!blob) {
    return;
  }

  const url = URL.createObjectURL(blob);

  const printWindow = window.open(url, "_blank");
  if (printWindow !== null) {
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        URL.revokeObjectURL(url);
      };
    };
  }
};

export const readTemplateFiles = async (files: File[]): Promise<PrintFormSchema[]> => {
  const sheets = await Promise.all(
    files.map(async (file) => {
      try {
        const ab = await file.bytes()
        const wb = xlsx.read(ab, { type: 'array' })
        const sheet = wb.Sheets[wb.SheetNames[0]];

        const json = xlsx.utils.sheet_to_json<PrintFormSchema>(sheet, { header: 0 });
        return json;
      } catch (e) {
        console.error(`error processing file: ${file.name} -- ${e}`)
        return [];
      }
    })
  )

  return sheets.flat()
}
