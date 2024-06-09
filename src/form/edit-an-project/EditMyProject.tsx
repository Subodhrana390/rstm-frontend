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

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/LoadingButtton";
import { Input } from "@/components/ui/input";
import { Project } from "@/types";
import DetailsSection from "../create-an-project/DetailsSection";
import VenueDetail from "../create-an-project/VenueDetail";
import { useEffect } from "react";

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
  })
  .refine((data) => data.coverPageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });
type ProjectFormData = z.infer<typeof formSchema>;

type Props = {
  project: Project;
  onSave: (ProjectFormData: FormData) => void;
  isLoading: boolean;
};
const EditProject = ({ onSave, isLoading, project }: Props) => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: project,
  });

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
    onSave(formData);
  };

  useEffect(() => {
    if (!project) {
      return;
    }

    form.reset(project);
  }, [form, project]);

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

export default EditProject;
