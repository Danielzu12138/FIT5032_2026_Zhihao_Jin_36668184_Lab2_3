<template>
  <div class="col-md-6 offset-md-3 mt-5">
    <h2 class="text-center mb-4">Member Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input v-model="username" class="form-control" type="text" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input v-model="password" class="form-control" type="password" required>
      </div>
      <p class="text-danger" v-if="errorMsg">{{ errorMsg }}</p>
      <button class="btn btn-primary w-100" type="submit">Sign In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../router/index'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')

const validUser = {
  username: 'libraryuser',
  password: 'lib123456'
}

const handleLogin = () => {
  if (username.value === validUser.username && password.value === validUser.password) {
    isAuthenticated.value = true
    router.push('/about')
  } else {
    errorMsg.value = 'Incorrect username or password'
  }
}
</script>