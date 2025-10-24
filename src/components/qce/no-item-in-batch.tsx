import { useBatch } from "@/lib/batch"
import { Button } from "../ui/button";

export const NoItemInBatch = () => {
    const batch = useBatch()

    return (
        <div className="flex flex-col items-center justify-center py-5 gap-5">
            <h1>There are no items in the print batch!</h1>
            <Button onClick={batch.new}>Create empty form</Button>
            <Button variant="secondary">Import csv/xsls</Button>
        </div>
    );
};
