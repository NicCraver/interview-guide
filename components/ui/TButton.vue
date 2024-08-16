<script setup lang="ts">
type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge'
type ButtonType = 'primary' | 'text'

interface ButtonProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  // loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  type: 'primary',
  disabled: false,
  // loading: false,
})

const buttonClasses = useButtonClasses(props)

function useButtonClasses(props: ButtonProps) {
  return computed(() => {
    const baseClasses = 'inline-flex items-center gap-x-1.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
    const sizeClasses: Record<ButtonSize, string> = {
      small: 'px-2.5 py-1.5 text-sm',
      medium: 'px-3 py-2 text-sm',
      large: 'px-3.5 py-2.5 text-sm',
      xlarge: 'px-4 py-3 text-sm',
    }
    const typeClasses: Record<ButtonType, string> = {
      primary: 'rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
      text: 'rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600',
    }

    const disabledClasses = 'opacity-70 cursor-not-allowed'

    return `${baseClasses} ${sizeClasses[props.size || 'medium']} ${typeClasses[props.type || 'primary']} ${props.disabled ? disabledClasses : ''} `
  })
}
</script>

<template>
  <button :class="buttonClasses" type="button">
    <slot />
  </button>
</template>

<style scoped>
/* 添加你需要的样式 */
</style>
<!--
<script setup lang="ts">
import { computed } from 'vue'

type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge'
type ButtonType = 'primary' | 'secondary' | 'text'

interface ButtonProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  type: 'primary',
  disabled: false,
  loading: false,
})

const buttonClasses = useButtonClasses(props)

function useButtonClasses(props: ButtonProps) {
  return computed(() => {
    const baseClasses = 'inline-flex items-center gap-x-1.5 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200'
    const sizeClasses: Record<ButtonSize, string> = {
      small: 'px-2.5 py-1.5 text-sm',
      medium: 'px-3 py-2 text-sm',
      large: 'px-3.5 py-2.5 text-sm',
      xlarge: 'px-4 py-3 text-sm',
    }
    const typeClasses: Record<ButtonType, string> = {
      primary: 'rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
      secondary: 'rounded-md bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
      text: 'rounded-md bg-transparent text-indigo-600 hover:bg-indigo-50 focus-visible:outline-indigo-600',
    }
    const disabledClasses = 'opacity-70 cursor-not-allowed'
    const loadingClasses = 'cursor-wait'

    const size = props.size || 'medium'
    const type = props.type || 'primary'

    const classes = [
      baseClasses,
      sizeClasses[size],
      typeClasses[type],
    ]

    if (props.disabled) {
      classes.push(disabledClasses)
    }
    else if (props.loading) {
      classes.push(loadingClasses)
    }

    return classes.join(' ')
  })
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    type="button"
  >
    <span v-if="loading" class="mr-2">
      Loading...
    </span>
    <slot />
  </button>
</template> -->
