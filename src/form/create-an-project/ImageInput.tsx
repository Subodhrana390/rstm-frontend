import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row items-end gap-2 ">
      <FormField
        control={control}
        name={`images${index}.url`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="file"
                onChange={(event) => {
                  field.onChange(
                    event.target.files ? event.target.files[index] : null
                  );
                }}
                className="bg-white "
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
