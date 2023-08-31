<template>
    <div id="loginBody">
        <div v-show="state === 'login'" class="loginContent">
            <Login :state="state" @changeState="changeState"></Login>

        </div>
        <div v-show="state === 'sign'" class="loginContent">
            <Sign :state="state" @changeState="changeState"> </Sign>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Login from './Login.vue'
import Sign from './Sign.vue'
import { useState } from "./hook.tsx"

const { formData } = useState()
const state = ref('login');

const changeState = (newState) => {
    state.value = newState;
};
</script>


<style scoped>
/* #loginBody {
    margin-top: 200px;
} */

.loginContent {

    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
}
</style>
