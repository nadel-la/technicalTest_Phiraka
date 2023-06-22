<script>
import { useMainStore } from '../stores/counter'
import { mapActions, mapState } from 'pinia'
import TableUser from '../components/TableUser.vue'

export default {
  components: {
    TableUser
  },
  computed: {
    ...mapState(useMainStore, ['users'])
  },
  methods: {
    ...mapActions(useMainStore, ['fetchUsers'])
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<template>
  <!-- <h1 style="margin-top: 85px; margin-left: 420px" class="text-5xl font-extrabold dark:text-white">
    List Users
  </h1> -->
  <div class="container" style="margin-top: 140px; margin-left: 120px">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">No</th>
            <th scope="col" class="px-6 py-3">Nama</th>
            <th scope="col" class="px-6 py-3">Password</th>
            <th scope="col" class="px-6 py-3">Ctime</th>
            <th scope="col" class="px-6 py-3">Fungsi</th>
          </tr>
        </thead>
        <tbody>
          <TableUser
            v-for="(user, index) in users"
            :key="user.id"
            :user="user"
            :index="index + 1"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
