export enum Loading {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export type AuthStore = {
  user: any;
  error: any;
  loading: Loading;
  isAuthenticated: boolean;
}