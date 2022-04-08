<template>
  <form @submit.prevent="processForm">
    <input
      type="text"
      placeholder="enter to add todo"
      class="form-control my-3"
      v-model.trim="text"
    />
  </form>
</template>

<script>
import { useDb } from '@/composables/useDb';
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
export default {
    setup() {
        const {addTodo} = useDb();
        const text = ref('');
        const todos = inject('todos')
        const error = inject('error')

        const processForm = async () => {
            if(!text.value.trim()) {
                console.log('empty text');
                return
            }

            const todo = await addTodo(text.value)

            if(todo.res) {
                error.value = todo.error
                text.value = ''
                return
            }

            todos.value = [...todos.value, todo]
            text.value = ''
        }

        return { text, processForm }
    }
};
</script>

<style>
</style>