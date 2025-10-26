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
  return (
    <Page size={{ width: 467.72, height: 283.46 }}>
      <View>
        <Text style={{ ...styles.text, top: "2.15cm", left: "2.3cm" }}>{p.shipperName}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.shipperContactNo}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.shipperAddress}</Text>
        <Text style={{ ...styles.text, top: "4.65cm", left: "1cm" }}>{p.parcelDescription}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.modeOfPayment}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.packagingType}</Text>
        <Text style={{ ...styles.text, top: "2.15cm", left: "10cm" }}>{p.consigneeName}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.consigneeContactNo}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.consigneeAddress}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.idPresented}</Text>
        <Text style={{ ...styles.text, top: 10 }}>{p.deliveryInstructions}</Text>
      </View>
    </Page>
  );
};
