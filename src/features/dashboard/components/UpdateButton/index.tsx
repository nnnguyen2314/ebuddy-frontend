'use client';

import { Button } from '@mui/material';
import { useUpdateButton } from './useUpdateButton';

const UpdateButton = () => {
  const { handleUpdate } = useUpdateButton();

  return (
    <Button variant="contained" onClick={handleUpdate}>
      Update User Data
    </Button>
  );
};

export default UpdateButton;
