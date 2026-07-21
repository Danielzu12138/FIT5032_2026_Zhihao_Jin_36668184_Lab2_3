<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills align-items-center gap-3">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 6)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link btn btn-sm btn-outline-primary">Login</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <button class="nav-link btn btn-sm btn-danger" @click="logout">Logout</button>
        </li>
        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Register</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from '@/main.js'

const router = useRouter()
const isAuthenticated = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true
    } else {
      isAuthenticated.value = false
    }
  })
})

const logout = async () => {
  console.log("User before logout:", auth.currentUser)
  await signOut(auth)
  console.log("User after logout:", auth.currentUser)
  router.push('/Firelogin')
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>