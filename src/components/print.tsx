import { useBatch } from "@/lib/batch";
import type { PrintFormSchema } from "@/lib/types";
import { StyleSheet, Document, View, Page, Text } from "@react-pdf/renderer";

export const PrintDocument = ({ useCurrent }: { useCurrent: boolean }) => {
  const batch = useBatch();

  return (
    <Document>
      {
        useCurrent ? (
            <PrintDocData p={batch.items[batch.currentItemInView]} />
        ) : 
        batch.items.map((p, idx) => (
            <PrintDocData p={p} key={idx} />
        ))
      }
    </Document>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 8, position: "absolute" }
})

const PrintDocData = ({ p }: { p: PrintFormSchema }) => {
  return (
    <Page size={{ width: 467.72, height: 283.46 }}>
      <View>
        <Text style={{...styles.text, top: "2.15cm", left: "2.3cm"}}>{p.shipperName}</Text>
        <Text style={{...styles.text, top: 10}}>{p.shipperContactNo}</Text>
        <Text style={{...styles.text, top: 10}}>{p.shipperAddress}</Text>
        <Text style={{...styles.text, top: "4.65cm", left: "1cm"}}>{p.parcelDescription}</Text>
        <Text style={{...styles.text, top: 10}}>{p.modeOfPayment}</Text>
        <Text style={{...styles.text, top: 10}}>{p.packagingType}</Text>
        <Text style={{...styles.text, top: "2.15cm", left: "10cm"}}>{p.consigneeName}</Text>
        <Text style={{...styles.text, top: 10}}>{p.consigneeContactNo}</Text>
        <Text style={{...styles.text, top: 10}}>{p.consigneeAddress}</Text>
        <Text style={{...styles.text, top: 10}}>{p.idPresented}</Text>
        <Text style={{...styles.text, top: 10}}>{p.deliveryInstructions}</Text>
      </View>
    </Page>
  );
};
