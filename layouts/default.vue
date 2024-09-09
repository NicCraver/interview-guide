<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<script setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const route = useRoute()
const router = useRouter()

const { menuList, setMenuList } = useMenuStore()

const headerTitle = ref(menuList.filter(item => item.path === route.path)[0]?.title)

function goPage(item) {
  router.push(item.path)
  setMenuList(item.path)
  headerTitle.value = menuList.filter(el => el.path === item.path)[0]?.title

  updateContentStatus(item.path)
}

// 主内容状态
const contentStatus = ref('full')
function updateContentStatus(path) {
  if (path === '/QuestionBank') {
    contentStatus.value = 'width'
  }
  else {
    contentStatus.value = 'full'
  }
}

setMenuList(route.path)
updateContentStatus(route.path)
</script>

<template>
  <div class="min-h-full">
    <div class="bg-indigo-600 pb-32">
      <Popover
        v-slot="{ open }" as="header"
        class="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
      >
        <div class="mx-auto max-w-[1440px] px-2 sm:px-4 lg:px-8">
          <div
            class="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25"
          >
            <div class="flex items-center px-2 lg:px-0">
              <div class="flex-shrink-0">
                <img
                  class="block h-8 w-8" src="https://tailwindui.starxg.com/img/logos/mark.svg?color=indigo&shade=300"
                  alt="Your Company"
                >
              </div>
              <div class="hidden md:ml-10 md:block">
                <div class="flex space-x-4">
                  <div
                    v-for="item in menuList" :key="item.name" class="rounded-md px-3 py-2 text-sm font-medium"
                    :class="[item.current ? 'bg-indigo-700 text-white' : 'text-white hover:bg-indigo-500 hover:bg-opacity-75']"
                    @click="goPage(item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex md:hidden ">
              <button
                class="ml-2 relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <MagnifyingGlassIcon class=" block h-6 w-6" aria-hidden="true" />
              </button>
              <ClientOnly>
                <PopoverButton
                  class="ml-2 relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </ClientOnly>
            </div>
            <div class="hidden md:ml-4 md:block">
              <div class="flex items-center">
                <button
                  class="ml-2 relative inline-flex items-center justify-center rounded-full bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Open main menu</span>
                  <MagnifyingGlassIcon class=" block h-6 w-6" aria-hidden="true" />
                </button>
                <Menu as="div" class="relative ml-3 flex-shrink-0">
                  <div>
                    <ClientOnly>
                      <MenuButton
                        class="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      >
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">Open user menu</span>
                        <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="">
                      </MenuButton>
                    </ClientOnly>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                        <a
                          :href="item.href" class="block px-4 py-2 text-sm text-gray-700"
                          :class="[active ? 'bg-gray-100' : '']"
                        >{{ item.name }}</a>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        <TransitionRoot as="template" :show="open">
          <div class="lg:hidden">
            <TransitionChild
              as="template" enter="duration-150 ease-out" enter-from="opacity-0" enter-to="opacity-100"
              leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-0"
            >
              <PopoverOverlay class="fixed inset-0 z-20 bg-black bg-opacity-25" />
            </TransitionChild>

            <TransitionChild
              as="template" enter="duration-150 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-150 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <PopoverPanel
                focus
                class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
              >
                <div class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div class="pb-2 pt-3">
                    <div class="flex items-center justify-between px-4">
                      <div>
                        <img
                          class="h-8 w-auto"
                          src="https://tailwindui.starxg.com/img/logos/mark.svg?color=indigo&shade=600"
                          alt="Your Company"
                        >
                      </div>
                      <div class="-mr-2">
                        <PopoverButton
                          class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close menu</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </PopoverButton>
                      </div>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                      <!-- <NuxtLink
                        v-for="item in menuList" :key="item.name" :to="item.path"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        :aria-current="item.path === route.path ? 'page' : undefined"
                      >
                        {{ item.name }}
                      </NuxtLink> -->
                    </div>
                  </div>
                  <div class="pb-2 pt-4">
                    <div class="flex items-center px-5">
                      <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="">
                      </div>
                      <div class="ml-3 min-w-0 flex-1">
                        <div class="truncate text-base font-medium text-gray-800">
                          {{ user.name }}
                        </div>
                        <div class="truncate text-sm font-medium text-gray-500">
                          {{ user.email }}
                        </div>
                      </div>
                      <button
                        type="button"
                        class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div class="mt-3 space-y-1 px-2">
                      <a
                        v-for="item in userNavigation" :key="item.name" :href="item.href"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                      >{{
                        item.name }}</a>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </TransitionChild>
          </div>
        </TransitionRoot>
      </Popover>
      <header class="py-6">
        <div class="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-bold tracking-tight text-white">
            {{ headerTitle }} - {{ contentStatus }}
          </h1>
        </div>
      </header>
    </div>

    <main v-if="contentStatus === 'full'" class="-mt-32">
      <div class="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
          <slot />
        </div>
      </div>
    </main>
    <main v-else class="-mt-32">
      <slot />
    </main>
  </div>
</template>
