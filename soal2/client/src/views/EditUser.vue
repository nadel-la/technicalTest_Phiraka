<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores/counter'

export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(useMainStore, ['editUser']),

    doEdit() {
      const { id } = this.$route.params
      this.editUser(id, this.username)
    }
  }
}
</script>

<template>
  <h1 style="margin-top: 85px; margin-left: 420px" class="text-5xl font-extrabold dark:text-white">
    Edit User
  </h1>

  <div class="container" style="margin-top: 50px">
    <div class="flex justify-center" style="align-self: center">
      <form @submit.prevent="doEdit">
        <div class="mb-6">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Edit username</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
