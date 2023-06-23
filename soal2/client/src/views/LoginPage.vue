<script>
import { useMainStore } from '@/stores/counter'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      dataLogin: {
        username: '',
        password: '',
        captchaVerif: ''
      }
    }
  },
  computed: {
    ...mapState(useMainStore, ['captcha'])
  },
  methods: {
    ...mapActions(useMainStore, ['login', 'loadCaptcha']),

    doLogin() {
      // console.log(this.dataLogin);
      this.login(this.dataLogin.username, this.dataLogin.password, this.dataLogin.captchaVerif)
    }
  },
  created() {
    this.loadCaptcha()
  }
}
</script>

<template>
  <h1 style="margin-top: 85px; margin-left: 480px" class="text-5xl font-extrabold dark:text-white">
    Please Login
  </h1>
  <div class="container" style="margin-top: 50px">
    <div class="flex justify-center" style="align-self: center">
      <form @submit.prevent="doLogin">
        <div class="mb-6">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your username</label
          >
          <input
            v-model="dataLogin.username"
            type="text"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            v-model="dataLogin.password"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Captcha</label>
          <span v-if="captcha && captcha.data" v-html="captcha.data"></span>
          <input
            type="text"
            v-model="dataLogin.captchaVerif"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="captcha here"
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
