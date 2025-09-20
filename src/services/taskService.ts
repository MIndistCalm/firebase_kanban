import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Task, TaskFormData } from '../types';

// Получение всех задач пользователя
export const getTasks = async (userId: string): Promise<Task[]> => {
    try {
        const tasksRef = collection(db, 'tasks');
        // Получаем все задачи
        const querySnapshot = await getDocs(tasksRef);
        const tasks = querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                updatedAt: doc.data().updatedAt?.toDate() || new Date(),
            })) as Task[];

        // Фильтруем и сортируем
        return tasks
            .filter(task => task.userId === userId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Создание новой задачи
export const createTask = async (taskData: TaskFormData, userId: string): Promise<Task> => {
    try {
        const tasksRef = collection(db, 'tasks');
        const newTask = {
            ...taskData,
            completed: false,
            userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(tasksRef, newTask);

        return {
            id: docRef.id,
            ...taskData,
            completed: false,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Обновление задачи
export const updateTask = async (taskId: string, updates: Partial<TaskFormData & { completed?: boolean }>): Promise<void> => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, {
            ...updates,
            updatedAt: serverTimestamp(),
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Удаление задачи
export const deleteTask = async (taskId: string): Promise<void> => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Переключение статуса выполнения задачи
export const toggleTaskCompletion = async (taskId: string, completed: boolean): Promise<void> => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, {
            completed,
            updatedAt: serverTimestamp(),
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
};