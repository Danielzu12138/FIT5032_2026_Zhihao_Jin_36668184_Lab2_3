<template>
  <button
    type="button"
    :style="customStyles"
    :disabled="disabled"
    @click="emit('click', $event)"
    class="custom-btn"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  color: { type: String, default: 'primary' }, // 'primary', 'success', 'danger'
  size: { type: String, default: 'medium' },    // 'small', 'medium', 'large'
  disabled: { type: Boolean, default: false },
  styleType: { type: String, default: 'filled' } // 'filled', 'outlined'
})

const emit = defineEmits(['click'])

// 模拟 Bootstrap 的颜色核心十六进制值
const colorPalette = {
  primary: { main: '#0d6efd', text: '#fff' },
  success: { main: '#198754', text: '#fff' },
  secondary: { main: '#6c757d', text: '#fff' },
  danger: { main: '#dc3545', text: '#fff' }
}

// 模拟 Bootstrap 尺寸对应的内边距和字号
const sizePalette = {
  small: { padding: '0.25rem 0.5rem', fontSize: '0.875rem' },
  medium: { padding: '0.375rem 0.75rem', fontSize: '1rem' },
  large: { padding: '0.5rem 1rem', fontSize: '1.25rem' }
}

const customStyles = computed(() => {
  const selectedColor = colorPalette[props.color] || colorPalette.primary
  const selectedSize = sizePalette[props.size] || sizePalette.medium

  let styleObj = {
    padding: selectedSize.padding,
    fontSize: selectedSize.fontSize,
    borderRadius: '0.375rem',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.65 : 1,
    transition: 'all 0.15s ease-in-out',
    border: `1px solid ${selectedColor.main}`,
    display: 'inline-block',
    fontWeight: '400',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'middle'
  }

  // 根据 filled 或 outlined 决定背景和文字颜色
  if (props.styleType === 'outlined') {
    styleObj.backgroundColor = 'transparent'
    styleObj.color = selectedColor.main
  } else {
    styleObj.backgroundColor = selectedColor.main
    styleObj.color = selectedColor.text
  }

  return styleObj
})
</script>