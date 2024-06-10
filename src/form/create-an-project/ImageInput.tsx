import { useFormContext } from "react-hook-form";

function ImageSection() {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor="imageUrl">Image URL</label>
      <input id="imageUrl" type="text" {...register("imageUrl")} />

      <label htmlFor="imageFiles">Upload Images</label>
      <input id="imageFiles" type="file" {...register("imageFiles")} multiple />
    </div>
  );
}

export default ImageSection;
