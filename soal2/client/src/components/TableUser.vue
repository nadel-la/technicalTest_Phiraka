<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores/counter'

export default {
  props: ['user', 'index'],
  methods: {
    ...mapActions(useMainStore, ['deleteUser']),
    formatDate(date) {
      const formatDate = new Date(date)
      return formatDate.toLocaleDateString('en-GB')
    },
    deletelist() {
      this.deleteUser(this.user.id)
    },
    toEdit() {
      this.$router.push(`/editUser/${this.user.id}`)
    }
  }
}
</script>

<template>
  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ index }}
    </th>
    <td class="px-6 py-4">{{ user.username }}</td>
    <td class="px-6 py-4">Xxxx</td>
    <td class="px-6 py-4">{{ formatDate(user.createdAt) }}</td>
    <td class="px-6 py-4">
      <a @click="toEdit" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >Edit</a
      >
      <a
        @click="deletelist"
        class="font-medium text-red-600 dark:text-red-500 hover:underline"
        style="margin-left: 20px"
        >Delete</a
      >
    </td>
  </tr>
</template>

<style></style>
