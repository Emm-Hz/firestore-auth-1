<template>
  <div class="card shadow-sm mb-2">
    <div class="card-body">
      <p class="m-0" :class="{'text-decoration-line-through': todo.state}">{{ todo.text }}</p>
      <div class="mt-2">
        <button
          class="btn me-1"
          @click="mod(todo)"
          :disabled="bloq"
          :class="todo.state ? 'btn-success' : 'btn-warning'"
        >
          {{ todo.state ? 'Done' : 'To do'}}
        </button>
        <button class="btn btn-danger" @click="del(todo.id)" :disabled="bloq">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useDb } from "@/composables/useDb";
import { inject, ref } from "@vue/runtime-core";
export default {
  props: { todo: Object },
  setup() {
    const { delTodo, modTodo } = useDb();
    const bloq = ref(false);
    const error = inject("error");
    const todos = inject("todos");

    const del = async (id) => {
      bloq.value = true;
      const response = await delTodo(id);

      if (response.res) {
        error.value = response.error;
        bloq.value = false;
        return;
      }

      todos.value = todos.value.filter((item) => item.id != id);
      bloq.value = false;
    };

    const mod = async (todo) => {
      bloq.value = true;
      const response = await modTodo(todo);
      if (response.res) {
        error.value = response.error;
        bloq.value = false;
        return;
      }

      todos.value = todos.value.map((item) =>
        item.id == todo.id ? { ...item, state: !todo.state } : item
      );
      bloq.value = false;
    };

    return { del, mod, bloq };
  },
};
</script>