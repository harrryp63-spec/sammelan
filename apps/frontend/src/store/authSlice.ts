import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Role = 'SAYOJAK' | 'SAMITI_HEAD' | 'TEAM_MEMBER';

interface AuthState {
  token: string | null;
  user: { id: string; fullName: string; role: Role; samitiId?: string } | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.clear();
    }
  }
});

export const { setSession, logout } = authSlice.actions;
export default authSlice.reducer;
