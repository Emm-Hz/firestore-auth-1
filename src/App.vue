<template>
<chargin-view v-if="loading" class="mt-5"/>
  <div v-else>
    <NavbarComp />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarComp from "@/components/NavbarComp";
import CharginView from "@/components/CharginView";
import {firebase} from "@/firebase"
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

export default {
  components: {
    NavbarComp,
    CharginView
  },
  setup() {
    const loading = ref(false)

    onMounted(async () => {
      loading.value= true
      await firebase.getCurrentUser()
      loading.value = false
    })

    return { loading }
  }
};
</script>
