<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-6">
              <label for="username" class="form-label">Username</label>
              <input 
                type="text" 
                class="form-control" 
                id="username"
                v-model="formData.username"
                @blur="validateName(true)"
                @input="validateName(false)"/>
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input 
                type="password" 
                class="form-control" 
                id="password"
                v-model="formData.password"
                @blur="validatePassword(true)"
                @input="validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-6">
              <div class="form-check mt-4">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="isAustralian" 
                  v-model="formData.isAustralian"
                >
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>
            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select 
                class="form-select" 
                id="gender" 
                v-model="formData.gender"
                @blur="validateGender(true)"
                @change="validateGender(false)">
                <option value="">Please select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea 
              class="form-control" 
              id="reason" 
              rows="3" 
              v-model="formData.reason"
              @blur="validateReason(true)"
              @input="validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
          </div>

          <div class="text-center" style="display: flex; justify-content: center; gap: 12px;">
            <Button 
                label="Submit" 
                color="primary" 
                size="medium" 
                styleType="filled" 
                type="submit"
            />
            <Button 
                label="Clear" 
                color="secondary" 
                size="medium" 
                styleType="outlined" 
                @click="clearForm" 
            />
          </div>
        </form>
      </div>
    </div>

    <!-- PrimeVue DataTable 实现实验4需求 -->
    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-12">
        <h3 class="mb-3">Submitted User Records</h3>
        <DataTable 
          :value="submittedCards" 
          paginator 
          rows="5"
          stripedRows
          responsiveLayout="scroll"
        >
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column field="isAustralian" header="Australian Resident">
            <template #body="slot">
              {{ slot.data.isAustralian ? 'Yes' : 'No' }}
            </template>
          </Column>
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason for joining" />
        </DataTable>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 导入你的自定义按钮组件
import Button from './Button.vue'
// PrimeVue表格组件
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

// 修正错误对象，移除不需要强制校验的isAustralian
const errors = ref({
  username: null,
  password: null,
  gender: null,
  reason: null,
});

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateReason(true)

  // 仅校验4个必填字段，复选框选填，不再判断isAustralian
  const allPass = !errors.value.username 
    && !errors.value.password 
    && !errors.value.gender 
    && !errors.value.reason

  if (allPass) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    gender: '',
    reason: ''
  }
  errors.value = {
    username: null,
    password: null,
    gender: null,
    reason: null
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = "Name must be at least 3 characters";
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  const minlength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minlength) {
    if (blur) errors.value.password = `Password must be at least ${minlength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Please select your gender";
  } else {
    errors.value.gender = null;
  }
}

const validateReason = (blur) => {
  const text = formData.value.reason.trim()
  if (text.length < 8) {
    if (blur) errors.value.reason = "Reason must be at least 8 characters long and cannot be empty";
  } else {
    errors.value.reason = null;
  }
}
</script>

<style scoped>
</style>