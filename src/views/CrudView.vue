<template>
  <div v-if="isAuthenticated">
    <h1>Crud</h1>
    <chargin-view v-if="chargin" />
    <div v-else>
      <error-comp v-if="printError" />
      <todo-form />
      <todo-comp v-for="(todo) in todos" :key="todo.id" :todo="todo"/>
      <p v-if="todos.length === 0">
        Nothing to do
      </p>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@vueuse/firebase";
import { useDb } from "@/composables/useDb";
import CharginView from "@/components/CharginView.vue";
import { ref } from "@vue/reactivity";
import { computed, onMounted, provide } from "@vue/runtime-core";
import ErrorComp from "@/components/ErrorComp.vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoComp from "@/components/TodoComp.vue"

export default {
  components: {
    CharginView,
    ErrorComp,
    TodoForm,
    TodoComp,
  },
  setup() {
    const { isAuthenticated } = useAuth();
    const { getTodo, chargin } = useDb();
    const todos = ref([]);
    const error = ref(null);

    provide("error", error);
    provide("todos", todos);

    const printError = computed(() => (error.value ? true : false));

    onMounted(async () => {
      todos.value = await getTodo();
      if (todos.value.res) {
        error.value = todos.value.error;
      }
    });

    return { isAuthenticated, todos, chargin, printError };
  },
};
</script>