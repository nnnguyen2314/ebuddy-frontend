import { updateUserData } from '@/shared/apis/userApi';

export const useUpdateButton = () => {
  const handleUpdate = async () => {
    try {
      await updateUserData('userId123', { numberOfRents: 35 });
      console.log('User data updated!');
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  return { handleUpdate };
};
