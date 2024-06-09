import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = { auth0Id: string; email: string };

export const UseCreateMyUserRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isLoading, isSuccess, isError };
};

export const UseGetMyUserRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const GetMyUserRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", GetMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading, error };
};

export const UseCheckAdminRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const checkAdminRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user/admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  };

  const {
    data: adminUser,
    isLoading,
    error,
  } = useQuery("checkAdminUser", checkAdminRequest);

  return { adminUser, isLoading, error };
};

export const UseUpdaMyUserRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const UpdateMyUserRequest = async (formData: FormData): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(UpdateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};
