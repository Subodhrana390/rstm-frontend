import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./ImageInput";
import { Button } from "@/components/ui/button";

const UploadImages = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>

      <div>
        <FormField
          control={control}
          name="coverPageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpeg,.png,.jpg"
                  onChange={(event) => {
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    );
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold">Images</h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>
      <div className="my-2">
        <FormField
          control={control}
          name="images"
          render={() => (
            <FormItem className="flex flex-col gap-2">
              {fields.map((_, index) => (
                <MenuItemInput
                  key={index}
                  index={index}
                  removeMenuItem={() => remove(index)}
                />
              ))}
            </FormItem>
          )}
        />
        <Button
          type="button"
          className="my-2"
          onClick={() => {
            append({ url: "" });
          }}
        >
          Add new image
        </Button>
      </div>
    </div>
  );
};

export default UploadImages;
