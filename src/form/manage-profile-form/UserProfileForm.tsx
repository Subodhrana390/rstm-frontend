import { LoadingButton } from "@/components/LoadingButtton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(1, "name is required"),
    email: z.string().optional(),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  isLoading: boolean;
  onSave: (UserFormData: FormData) => void;
};

const UserProfileForm = ({ currentUser, isLoading, onSave }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", imageUrl: "" },
  });

  const existingImageUrl = form.getValues("imageUrl");
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  const onSubmit = (formDataJson: UserFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Information</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-items-start gap-5 py-2">
          <div className="w-[100px]">
            {existingImageUrl && (
              <img
                src={existingImageUrl}
                alt=""
                className="object-cover rounded-full"
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Save
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
