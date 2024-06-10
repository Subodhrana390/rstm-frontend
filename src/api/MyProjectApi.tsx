import { Project, User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UseCreateMyProjectRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyProjectRequest = async (
    projectForm: FormData
  ): Promise<Project> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: projectForm,
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }
    return response.json();
  };

  const {
    mutateAsync: createProject,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyProjectRequest);

  if (isSuccess) {
    toast.success("successfully created an Project");
  }

  if (error) {
    console.log(error);
    toast.error("Unable to update restaurant");
  }

  return { createProject, isLoading };
};

export const UseUpdateMyProjectRequest = (id?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyProjectRequest = async (formData: FormData): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update project");
    }
    return response.json();
  };

  const {
    mutateAsync: updateProject,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyProjectRequest);

  if (isSuccess) {
    toast.success("project Successfullly updated!");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateProject,
    isLoading,
  };
};

export const UseGetMyProjectRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyProjectRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get project");
    }
    return response.json();
  };

  const {
    data: getProject,
    isLoading,
    error,
    isFetched,
  } = useQuery("getMyProject", getMyProjectRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    getProject,
    isLoading,
    isFetched,
  };
};
export const UseGetMyProjectByIdRequest = (id?: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyProjectByIdRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get project");
    }
    return response.json();
  };

  const {
    data: getProject,
    isLoading,
    error,
  } = useQuery("getMyProjectById", getMyProjectByIdRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    getProject,
    isLoading,
  };
};

export const UseDeleteMyProjectByIdRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const deleteMyProjectByIdRequest = async (id?: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/project/?id=${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
  };

  const { isLoading, isSuccess, error } = useMutation(
    deleteMyProjectByIdRequest
  );

  if (isSuccess) {
    toast.success("Delete successfully");
  }
  if (error) {
    toast.error("error");
  }
  return { isLoading };
};

