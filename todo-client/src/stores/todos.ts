import axios from 'axios';
import { defineStore } from 'pinia';

const api = axios.create({
  baseURL: 'http://localhost:3100',
});

export interface Todo {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  completedAt: string | null;
}

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
    error: '',
  }),
  getters: {
    remainingCount: (state) => state.todos.filter((todo) => !todo.completedAt).length,
    completedCount: (state) => state.todos.filter((todo) => todo.completedAt).length,
  },
  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = '';

      try {
        const response = await api.get<Todo[]>('/tasks');
        this.todos = response.data;
      } catch (error) {
        this.error = 'Failed to fetch todos.';
        console.error('Failed to fetch todos:', error);
      } finally {
        this.loading = false;
      }
    },
    async addTodo(name: string, description?: string) {
      const response = await api.post<Todo>('/tasks', { name, description });
      this.todos = [response.data, ...this.todos];
    },
    async toggleTodo(todo: Todo) {
      const response = await api.patch<Todo>(`/tasks/${todo.id}`, {
        completed: !todo.completedAt,
      });
      this.todos = this.todos.map((item) => (item.id === todo.id ? response.data : item));
    },
    async deleteTodo(id: number) {
      await api.delete(`/tasks/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
});
