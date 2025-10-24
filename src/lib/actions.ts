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
