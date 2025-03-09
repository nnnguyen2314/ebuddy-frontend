import { updateUserData } from '@/shared/apis/userApi';
import { useAppSelector } from '@/shared/hooks'
import { getAuthState } from '@/features/auth/store/auth.selectors'

export const useUpdateButton = () => {
  const { user } = useAppSelector(getAuthState);
  const handleUpdate = async () => {
    try {
      await updateUserData(user?.uid, { numberOfRents: 35 });
      console.log('User data updated!');
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  return { handleUpdate };
};
