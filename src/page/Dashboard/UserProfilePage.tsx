import { UseGetMyUserRequest, UseUpdaMyUserRequest } from "@/api/MyUserApi";
import UserProfileForm from "@/form/manage-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = UseUpdaMyUserRequest();
  const { currentUser, isLoading: isGetLoading } = UseGetMyUserRequest();

  if (isGetLoading) {
    return <span>Loading... </span>;
  }

  if (!currentUser) {
    return <span>Unable to Load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
