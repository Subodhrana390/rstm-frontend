import {
  UseGetMyProjectByIdRequest,
  UseUpdateMyProjectRequest,
} from "@/api/MyProjectApi";

import EditProject from "@/form/edit-an-project/EditMyProject";
import { useParams } from "react-router-dom";

const EditProjectPage = () => {
  const { id } = useParams();
  const { updateProject, isLoading: isUpdateLoading } =
    UseUpdateMyProjectRequest(id);
  const { getProject, isLoading: isGetLoading } =
    UseGetMyProjectByIdRequest(id);

  if (isGetLoading) {
    return <span>Loading...</span>;
  }
  return (
    <EditProject
      onSave={updateProject}
      isLoading={isUpdateLoading}
      project={getProject}
    />
  );
};

export default EditProjectPage;
