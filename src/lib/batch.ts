import { create } from "zustand";
import type { PrintFormSchema } from "./types";
import { clamp } from "./utils";

export type Batch = {
  batchDate: Date;
  items: PrintFormSchema[];
  itemCount: number;

  currentItemInView: number;

  next: () => void;
  prev: () => void;
  remove: (i: number) => void;
  saveForm: (id: number, form: PrintFormSchema) => void;

  // creates empty
  new: () => void;
};

export const useBatch = create<Batch>((set) => ({
  batchDate: new Date(),
  items: [],
  itemCount: 0,
  currentItemInView: 0,

  next: () =>
    set((x) => ({
      currentItemInView: clamp(x.currentItemInView + 1, 0, x.itemCount - 1),
    })),
  prev: () =>
    set((x) => ({
      currentItemInView: clamp(x.currentItemInView - 1, 0, x.itemCount - 1),
    })),
  remove: (b) =>
    set((x) => {
      const newItems = x.items.filter((_, i) => i !== b);

      return {
        items: newItems,
        currentItemInView: clamp(x.currentItemInView - 1, 0, x.itemCount - 1),
        itemCount: newItems.length,
      };
    }),
  saveForm: (id, form) =>
    set((x) => {
      x.items[id] = form;
      return {
        items: x.items,
      };
    }),

  new: () => {
    set((b) => ({
      items: [
        ...b.items,
        {
          id: b.itemCount,
          shipperDateAssigned: new Date().toDateString(),
          shipperCode: "",
          shipperName: "",
          shipperContactNo: "",
          shipperAddress: "",

          parcelDescription: "",
          modeOfPayment: "",
          packagingType: "",
          declaredValue: 0,
          totalCost: 0,
          totalWeight: 0,
          totalDimensions: "",

          consigneeName: "",
          consigneeContactNo: "",
          consigneeAddress: "",

          idPresented: false,
          deliveryInstructions: "",
        },
      ],
      itemCount: b.itemCount + 1,
      currentItemInView: b.itemCount,
    }));
  },
}));
