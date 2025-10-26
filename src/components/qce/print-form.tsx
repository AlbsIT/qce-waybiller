"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { printFormSchema, type PrintFormSchema } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { type Batch } from "@/lib/batch";
import { useEffect } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

export const PrintForm = ({
  batch
}: {
  batch: Batch,
}) => {

  const form = useForm<PrintFormSchema>({
    resolver: zodResolver(printFormSchema),
    defaultValues: {
      id: batch.currentItemInView,
      shipperDateAssigned: new Date().toString(),
    },
  });

  useEffect(() => {
    form.reset(batch.items[batch.currentItemInView]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batch.currentItemInView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveForm(null);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const saveForm = (formVal: PrintFormSchema | null) => {
    const vals = formVal ?? form.getValues();
    batch.saveForm(vals);

    // TODO notif for "successful save"
  };

  const onSubmit = (vals: PrintFormSchema) => {
    saveForm(vals);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-2 grid-rows-2 gap-5"
    >
      {/* Hidden Input */}
      <Controller
        name="id"
        control={form.control}
        render={({ field }) => (
          <input hidden {...field} value={batch.currentItemInView || ""} readOnly />
        )}
      />

      {/* Shipper Details */}
      <FieldGroup className="form-group">
        <h3 className="col-span-2">
          <Step num="1" /> Shipper Details
        </h3>
        <Controller
          name="shipperDateAssigned"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="shipperDateAssigned">
                Date Assigned
              </FieldLabel>
              <Input
                {...field}
                id="shipperDateAssigned"
                type="date"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="shipperCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="shipperCode">Shipper Code</FieldLabel>
              <Input
                {...field}
                id="shipperCode"
                aria-invalid={fieldState.invalid}
                placeholder="Enter shipper code"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="shipperName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="shipperName">Shipper Name</FieldLabel>
              <Input
                {...field}
                id="shipperName"
                aria-invalid={fieldState.invalid}
                placeholder="Enter shipper name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="shipperContactNo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="shipperContactNo">Contact No</FieldLabel>
              <Input
                {...field}
                id="shipperContactNo"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="Enter contact number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="shipperAddress"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="shipperAddress">Address</FieldLabel>
              <Textarea
                {...field}
                id="shipperAddress"
                aria-invalid={fieldState.invalid}
                placeholder="Enter shipper address"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Consignee Details */}
      <FieldGroup className="form-group">
        <h3 className="col-span-2">
          <Step num="2" /> Consignee Details
        </h3>
        <Controller
          name="consigneeName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="consigneeName">Consignee Name</FieldLabel>
              <Input
                {...field}
                id="consigneeName"
                aria-invalid={fieldState.invalid}
                placeholder="Enter consignee name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="consigneeContactNo"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="consigneeContactNo">Contact No</FieldLabel>
              <Input
                {...field}
                id="consigneeContactNo"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="Enter contact number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="idPresented"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex items-center gap-2"
            >
              <FieldLabel htmlFor="idPresented">ID Presented?</FieldLabel>
              <Checkbox
                id="idPresented"
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="consigneeAddress"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="consigneeAddress">Address</FieldLabel>
              <Textarea
                {...field}
                id="consigneeAddress"
                aria-invalid={fieldState.invalid}
                placeholder="Enter consignee address"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="deliveryInstructions"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="deliveryInstructions">
                Delivery Instructions
              </FieldLabel>
              <Textarea
                {...field}
                id="deliveryInstructions"
                aria-invalid={fieldState.invalid}
                placeholder="Enter delivery instructions"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Parcel Information */}
      <FieldGroup className="form-group">
        <h3 className="col-span-2">
          <Step num="3" /> Parcel Information
        </h3>
        <Controller
          name="parcelDescription"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="parcelDescription">
                Parcel Description
              </FieldLabel>
              <Textarea
                {...field}
                id="parcelDescription"
                aria-invalid={fieldState.invalid}
                placeholder="Enter parcel description"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="modeOfPayment"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="modeOfPayment">Mode of Payment</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="modeOfPayment" className="w-full">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ewallet">EWallet/QR</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="packagingType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="packagingType">Packaging Type</FieldLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="packagingType" className="w-full">
                  <SelectValue placeholder="Select packaging type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="box">Box</SelectItem>
                  <SelectItem value="envelope">Envelope</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="declaredValue"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="declaredValue">Declared Value</FieldLabel>
              <Input
                {...field}
                id="declaredValue"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Enter declared value"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="totalCost"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="totalCost">Total Cost</FieldLabel>
              <Input
                {...field}
                id="totalCost"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Enter total cost"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="totalWeight"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="totalWeight">Total Weight</FieldLabel>
              <Input
                {...field}
                id="totalWeight"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Enter total weight"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="totalDimensions"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="totalDimensions">
                Total Dimensions
              </FieldLabel>
              <Input
                {...field}
                id="totalDimensions"
                aria-invalid={fieldState.invalid}
                placeholder="Enter total dimensions"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" onClick={() => saveForm(null)}>
        Save
      </Button>
    </form>
  );
};

const Step = ({ num }: { num: string }) => (
  <div className="bg-primary text-white p-0 w-8 h-8 flex items-center-safe justify-center-safe rounded-full">
    {num}
  </div>
);
