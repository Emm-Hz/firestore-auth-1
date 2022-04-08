<template>
    <div v-if="isAuthenticated">
        <pre>{{user}}</pre>
    </div>
</template>

<script>
import {useAuth} from '@vueuse/firebase'
export default {
    setup() {
        const {user, isAuthenticated} = useAuth()
        
        return { user, isAuthenticated }
    }
}
</script>