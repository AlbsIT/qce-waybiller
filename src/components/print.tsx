import { useBatch } from "@/lib/batch";
import type { PrintFormSchema } from "@/lib/types";
import { StyleSheet, Document, View, Page, Text } from "@react-pdf/renderer";
import { useMemo } from "react";

export const PrintDocument = ({ useCurrent }: { useCurrent: boolean }) => {
  const batch = useBatch();

  const pages = useMemo(() => {
    if (useCurrent) {
      return [<PrintDocData p={batch.items[batch.currentItemInView]} />]
    }

    return batch.items.map((p, i) => {
      return (<PrintDocData key={i} p={p} />)
    })

  }, [batch.items, batch.currentItemInView])

  return (
    <Document>
      {pages}
    </Document>
  )
};

const styles = StyleSheet.create({
  text: { fontSize: 8, position: "absolute" }
})

const PrintDocData = ({ p }: { p: PrintFormSchema }) => {
  const date = new Date();
  return (
    <Page size={{ width: "6.5in", height: "4in" }}>
      <View>
        <Text style={{ ...styles.text, top: "0.6in", left: "0.45in" }}>{date.toLocaleDateString()}</Text>
        <Text style={{ ...styles.text, top: "0.9in", left: "0.9in" }}>{p.shipperName}</Text>
        <Text style={{ ...styles.text, top: "1.2in", left: "2.1in" }}>{p.shipperContactNo}</Text>
        <Text style={{ ...styles.text, top: "1.2in", left: "0.4in" }}>{p.shipperAddress}</Text>
        <Text style={{ ...styles.text, top: "1.9in", left: "0.4in" }}>{p.parcelDescription}</Text>
        <Text style={{ ...styles.text, top: "0.9in", left: "4.1in" }}>{p.consigneeName}</Text>
        <Text style={{ ...styles.text, top: "1.2in", left: "5.5in" }}>{p.consigneeContactNo}</Text>
        <Text style={{ ...styles.text, top: "1.2in", left: "3.3in" }}>{p.consigneeAddress}</Text>
        <Text style={{ ...styles.text, top: "1.9in", left: "3.3in" }}>{p.deliveryInstructions}</Text>
        <Text style={{ ...styles.text, top: "3.3in", left: "1in" }}>{p.declaredValue}</Text>
      </View>
    </Page>
  );
};
