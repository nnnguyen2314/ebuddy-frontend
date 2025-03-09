import { User } from 'firebase/auth';
export enum Loading {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export interface AuthStore {
  user: User | null;
  error: any;
  loading: Loading;
  isAuthenticated: boolean;
}
