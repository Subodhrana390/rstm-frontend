import {
  FormMessage,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import VenueDetail from "./VenueDetail";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/LoadingButtton";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

// const fileArraySchema = z.array(
//   z
//     .instanceof(File, { message: "Each element must be a File instance" })
//     .optional()
// );

const formSchema = z
  .object({
    title: z.string({ required_error: "Title is required" }),
    shortdesc: z.string({ required_error: "Short Description is required" }),
    desc: z.string({ required_error: "Description is required" }),
    venue: z.string({ required_error: "Venue is required" }),
    eventDate: z
      .string({ required_error: "eventDate is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    slug: z.string({ required_error: "Slug is required" }),
    startingTime: z
      .string()
      .refine((val) => /([01]\d|2[0-3]):([0-5]\d)/.test(val), {
        message: "Invalid time format",
      }),
    endingTime: z
      .string()
      .refine((val) => /([01]\d|2[0-3]):([0-5]\d)/.test(val), {
        message: "Invalid time format",
      }),
    coverPageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
    // imageUrl: z.array(z.string()),
    // imageFiles: fileArraySchema.optional(),
  })
  .refine(
    (data) => data.coverPageUrl ||data.imageFile,
    {
      message: "Either image URL or at least one image File must be provided",
      path: ["imageFiles"],
    }
  );

type ProjectFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (ProjectFormData: FormData) => void;
  isLoading: boolean;
};
const CreateProject = ({ onSave, isLoading }: Props) => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortdesc: "",
      desc: "",
      venue: "",
      eventDate: "",
      slug: "",
      coverPageUrl: "",
      // imageFiles: [],
    },
  });

  useEffect(() => {
    form.reset({
      title: "",
      shortdesc: "",
      desc: "",
      venue: "",
      eventDate: "",
      startingTime: "",
      endingTime: "",
      slug: "",
      coverPageUrl: "",
    });
  }, [form, isLoading]);

  const onSubmit = (formDataJson: ProjectFormData) => {
    const formData = new FormData();
    formData.append("title", formDataJson.title);
    formData.append("shortdesc", formDataJson.shortdesc);
    formData.append("desc", formDataJson.desc);
    formData.append("eventDate", formDataJson.eventDate);
    formData.append("startingTime", formDataJson.startingTime);
    formData.append("endingTime", formDataJson.endingTime);
    formData.append("venue", formDataJson.venue);
    formData.append("slug", formDataJson.slug);
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    // if (formDataJson.imageFiles && formDataJson.imageFiles.length > 0) {
    //   formDataJson.imageFiles.forEach((file, index) => {
    //     formData.append(`imageFiles[${index}]`, file);
    //   });
    // } else if (formDataJson.imageFiles) {
    //   formData.append("imageFiles[0]", formDataJson.imageFiles);
    // }

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <VenueDetail />
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

        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default CreateProject;
