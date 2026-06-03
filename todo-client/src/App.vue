<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useTodosStore } from './stores/todos';

const todosStore = useTodosStore();
const name = ref('');
const description = ref('');

const sortedTodos = computed(() => todosStore.todos);

onMounted(() => {
  todosStore.fetchTodos();
});

async function submitTodo() {
  const trimmedName = name.value.trim();

  if (!trimmedName) {
    return;
  }

  await todosStore.addTodo(trimmedName, description.value.trim() || undefined);
  name.value = '';
  description.value = '';
}
</script>

<template>
  <main class="app-shell">
    <section class="toolbar">
      <div>
        <p class="eyebrow">NestJS + Vue</p>
        <h1>Todo App</h1>
      </div>
      <div class="counts">
        <span>{{ todosStore.remainingCount }} active</span>
        <span>{{ todosStore.completedCount }} done</span>
      </div>
    </section>

    <form class="composer" @submit.prevent="submitTodo">
      <input v-model="name" type="text" placeholder="Task name" aria-label="Task name" />
      <input
        v-model="description"
        type="text"
        placeholder="Description"
        aria-label="Task description"
      />
      <button type="submit">Add</button>
    </form>

    <p v-if="todosStore.error" class="error">{{ todosStore.error }}</p>
    <p v-else-if="todosStore.loading" class="empty">Loading tasks...</p>
    <p v-else-if="sortedTodos.length === 0" class="empty">No tasks yet.</p>

    <ul v-else class="todo-list">
      <li v-for="todo in sortedTodos" :key="todo.id" :class="{ completed: todo.completedAt }">
        <label>
          <input
            type="checkbox"
            :checked="Boolean(todo.completedAt)"
            @change="todosStore.toggleTodo(todo)"
          />
          <span>
            <strong>{{ todo.name }}</strong>
            <small v-if="todo.description">{{ todo.description }}</small>
          </span>
        </label>
        <button type="button" class="delete" @click="todosStore.deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </main>
</template>
