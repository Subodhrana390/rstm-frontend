import { UseCreateMyProjectRequest } from "@/api/MyProjectApi";
import { LoadingButton } from "@/components/LoadingButtton";
import CreateProject from "@/form/create-an-project/CreateProject";

const CreateProjectPage = () => {
  const { createProject, isLoading: isCreatingLoading } =
    UseCreateMyProjectRequest();


    if (isCreatingLoading) {
      return (
        <div className=" h-full w-full flex justify-center items-center">
          <LoadingButton />
        </div>
      );
    }
  return <CreateProject onSave={createProject} isLoading={isCreatingLoading} />;
};

export default CreateProjectPage;
