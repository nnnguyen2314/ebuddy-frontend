import { updateUserData } from '@/shared/apis/userApi';
import { useAppSelector } from '@/shared/hooks';
import { getAuthState } from '@/features/auth/store/auth.selectors';
import useAppDispatch from '@/shared/hooks/useAppDispatch';
import { showNotification } from '@/shared/store/notification.slice';

export const useUpdateButton = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuthState);
  const handleUpdate = async () => {
    try {
      await updateUserData(user?.uid, { numberOfRents: 35 });
      dispatch(showNotification({ message: 'User updated successfully!', type: 'success' }));
    } catch (error) {
      console.error('Failed to update user data', error);
      dispatch(showNotification({ message: 'Failed to update user!', type: 'error' }));
    }
  };

  return { handleUpdate };
};
