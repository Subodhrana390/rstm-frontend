import { UseCreateMyProjectRequest } from "@/api/MyProjectApi";
import CreateProject from "@/form/create-an-project/CreateProject";

const CreateProjectPage = () => {
  const { createProject, isLoading: isCreatingLoading } =
    UseCreateMyProjectRequest();

  return <CreateProject onSave={createProject} isLoading={isCreatingLoading} />;
};

export default CreateProjectPage;
