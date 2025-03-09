import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { axiosErrorHandler, ServerError } from '@/shared/store/helpers';
import { RootState } from '@/shared/store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserCredential } from '@firebase/auth';

const requestErrorCatcher = (err: any, handler: { dispatch: any; rejectWithValue: any }) => {
  axiosErrorHandler(err, handler.dispatch);

  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError<ServerError>;
    return handler.rejectWithValue(axiosError.response?.data.messages as string);
  } else {
    const error = err as Error;
    return handler.rejectWithValue(error.message as string);
  }
};

export const doLogin = createAsyncThunk<
  any,
  { auth: any; email: string; password: string },
  { state: RootState }
>('auth/login', async (param, { rejectWithValue, dispatch }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      param.auth,
      param.email,
      param.password
    );
    const user = userCredential.user;

    // ✅ Extract only necessary, serializable user data
    const serializedUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Anonymous',
      photoURL: user.photoURL || '',
    };

    return serializedUser;
  } catch (err) {
    requestErrorCatcher(err, { dispatch, rejectWithValue });
  }
});
