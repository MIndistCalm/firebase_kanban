import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TaskState, TaskFormData } from '../../types';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '../../services/taskService';

// Начальное состояние
const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    filter: 'all',
    searchQuery: '',
};

// Async thunks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (userId: string) => {
        return await getTasks(userId);
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ taskData, userId }: { taskData: TaskFormData; userId: string }) => {
        return await createTask(taskData, userId);
    }
);

export const editTask = createAsyncThunk(
    'tasks/editTask',
    async ({ taskId, updates }: { taskId: string; updates: Partial<TaskFormData & { completed?: boolean }> }) => {
        await updateTask(taskId, updates);
        return { taskId, updates };
    }
);

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (taskId: string) => {
        await deleteTask(taskId);
        return taskId;
    }
);

export const toggleTask = createAsyncThunk(
    'tasks/toggleTask',
    async ({ taskId, completed }: { taskId: string; completed: boolean }) => {
        await toggleTaskCompletion(taskId, completed);
        return { taskId, completed };
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            // Add task
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.unshift(action.payload);
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add task';
            })
            // Edit task
            .addCase(editTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.loading = false;
                const { taskId, updates } = action.payload;
                const index = state.tasks.findIndex(task => task.id === taskId);
                if (index !== -1) {
                    state.tasks[index] = { ...state.tasks[index], ...updates, updatedAt: new Date() };
                }
                state.error = null;
            })
            .addCase(editTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update task';
            })
            // Remove task
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
                state.error = null;
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete task';
            })
            // Toggle task
            .addCase(toggleTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleTask.fulfilled, (state, action) => {
                state.loading = false;
                const { taskId, completed } = action.payload;
                const index = state.tasks.findIndex(task => task.id === taskId);
                if (index !== -1) {
                    state.tasks[index].completed = completed;
                    state.tasks[index].updatedAt = new Date();
                }
                state.error = null;
            })
            .addCase(toggleTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to toggle task';
            });
    },
});

export const { setFilter, setSearchQuery, clearError } = taskSlice.actions;
export default taskSlice.reducer;