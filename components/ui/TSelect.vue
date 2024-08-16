<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: 'Select Option',
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue
})
</script>

<template>
  <Listbox v-model="internalValue" as="div">
    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <span class="block truncate">{{ internalValue.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption v-for="option in options" :key="option.id" v-slot="{ active, selected }" as="template" :value="option">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
              <span class="block truncate" :class="[selected ? 'font-semibold' : 'font-normal']">{{ option.name }}</span>

              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="[active ? 'text-white' : 'text-indigo-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
