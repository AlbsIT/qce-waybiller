import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTrigger, DialogFooter, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "../ui/shadcn-io/dropzone"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { useBatch } from "@/lib/batch"
import { readTemplateFiles } from "@/lib/actions"

export const BatchImport = () => {
  const batch = useBatch();
  const [open, setOpen] = useState(false);
  const [processing, setProc] = useState(false);
  const [overwrite, setOverwrite] = useState<boolean | "indeterminate">(true);
  const [files, setFiles] = useState<File[] | undefined>()

  const processFiles = async () => {
    if (!files) {
      return;
    }

    setProc(true);
    const forms = await readTemplateFiles(files)

    if (overwrite) {
      batch.replaceAll(forms)
    }

    setProc(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Batch Import</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader><DialogTitle>Batch Import</DialogTitle></DialogHeader>
        <DialogDescription>Drag and drop your .csv or .xlsx file that follows our template</DialogDescription>

        <Dropzone accept={{ 'text/*': ['.csv', '.xlsx'] }} onDrop={(f) => setFiles(f)} src={files}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>

        <DialogFooter>
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row gap-2 items-center">
              <Checkbox id="overwrite" checked={overwrite} onCheckedChange={setOverwrite} />
              <Label htmlFor="overwrite">Should overwrite?</Label>
            </div>
            {files && (<Button disabled={processing} className="w-full" onClick={processFiles}>Process</Button>)}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

