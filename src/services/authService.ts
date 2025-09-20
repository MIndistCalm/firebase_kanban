import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './firebase';
import type { User } from '../types';

// Регистрация нового пользователя
export const registerUser = async (
    email: string,
    password: string,
    displayName?: string
): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Обновляем профиль пользователя
        if (displayName) {
            await updateProfile(user, { displayName });
        }

        return {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || undefined,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Вход пользователя
export const loginUser = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || undefined,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Выход пользователя
export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Преобразование Firebase User в наш тип User
export const mapFirebaseUser = (user: FirebaseUser): User => ({
    uid: user.uid,
    email: user.email!,
    displayName: user.displayName || undefined,
});