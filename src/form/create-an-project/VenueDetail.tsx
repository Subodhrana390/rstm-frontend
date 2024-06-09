import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const VenueDetail = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Venues Information</h2>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-5">
        <FormField
          control={control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full grid grid-cols-2 gap-2">
          <FormField
            control={control}
            name="startingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="endingTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ending Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.split(" ").join("-"))
                    }
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default VenueDetail;
