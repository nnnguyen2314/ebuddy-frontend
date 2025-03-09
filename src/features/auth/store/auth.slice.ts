import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthStore, Loading } from '@/shared/types';
import { doLogin } from '@/features/auth/store/auth.actions';

export const initialState: AuthStore = {
  user: {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
  },
  error: undefined,
  loading: Loading.idle,
  isAuthenticated: false,
};

const errorHandler = (state: AuthStore, payload: string) => {
  state.loading = Loading.failed;
  state.error = payload;
};

const authExtraReducers = (builder: ActionReducerMapBuilder<AuthStore>) => {
  builder
    .addCase(doLogin.pending, (state) => {
      state.loading = Loading.pending;
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.error = undefined;
    })
    .addCase(doLogin.rejected, (state, action) => {
      state.loading = Loading.failed;
      state.isAuthenticated = false;
      state.user = initialState.user;
      errorHandler(state, action.payload as string);
    })
    .addCase(doLogin.fulfilled, (state, action) => {
      state.loading = Loading.succeeded;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = undefined;
    });
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: authExtraReducers,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.isAuthenticated = false;
    },
    resetState: () => initialState,
  },
});

const persistConfig = {
  key: 'auth',
  storage,
};

export const { logout } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
