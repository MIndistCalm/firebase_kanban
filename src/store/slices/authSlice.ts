import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, AuthState } from '../../types';
import { registerUser, loginUser, logoutUser, mapFirebaseUser } from '../../services/authService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';

// Начальное состояние
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Async thunks
export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password, displayName }: { email: string; password: string; displayName?: string }) => {
        return await registerUser(email, password, displayName);
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        return await loginUser(email, password);
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await logoutUser();
    }
);

// Инициализация аутентификации
export const initAuth = createAsyncThunk(
    'auth/init',
    async () => {
        return new Promise<User | null>((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                unsubscribe();
                resolve(user ? mapFirebaseUser(user) : null);
            });
        });
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Logout failed';
            })
            // Init auth
            .addCase(initAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(initAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(initAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;