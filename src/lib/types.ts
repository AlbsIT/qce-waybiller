import { z } from "zod";

export const printFormSchema = z.object({
  id: z.number().min(1).optional(),
  shipperDateAssigned: z.string().optional(),
  //shipperDateAssigned: z
  //  .string()
  //  .min(1)
  //  .transform((val) => new Date(val))
  //  .refine((date) => !isNaN(date.getTime())),
  shipperCode: z.string().optional(),
  shipperName: z.string().optional(),
  shipperContactNo: z.string().optional(),
  shipperAddress: z.string().optional(),

  parcelDescription: z.string().optional(),
  modeOfPayment: z.string().optional(),
  packagingType: z.string().optional(),
  declaredValue: z.number().optional(),
  totalCost: z.number().optional(),
  totalWeight: z.number().optional(),
  totalDimensions: z.string().optional(),

  consigneeName: z.string().optional(),
  consigneeContactNo: z.string().optional(),
  consigneeAddress: z.string().optional(),

  idPresented: z.boolean().optional(),
  deliveryInstructions: z.string().optional(),
});

export type PrintFormSchema = z.infer<typeof printFormSchema>;
