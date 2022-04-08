<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    Ocurrió un error: {{ error }}
    <button type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="error = null"></button>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  setup() {
    const error = inject("error");

    return { error };
  },
};
</script>