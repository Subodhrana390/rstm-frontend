import { UseCreateMyProjectRequest } from "@/api/MyProjectApi";
import { LoadingButton } from "@/components/LoadingButtton";
import CreateProject from "@/form/create-an-project/CreateProject";

const CreateProjectPage = () => {
  const { createProject, isLoading: isCreatingLoading } =
    UseCreateMyProjectRequest();

  if (isCreatingLoading) {
    return <LoadingButton />;
  }

  return <CreateProject onSave={createProject} isLoading={isCreatingLoading} />;
};

export default CreateProjectPage;
