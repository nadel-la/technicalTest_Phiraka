import axios from 'axios'
import { defineStore } from 'pinia'
const baseUrl = `http://localhost:3000`

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      users: []
    }
  },
  actions: {
    async register(username, password) {
      try {
        console.log(username, password)
        let { data } = await axios({
          method: 'post',
          url: `${baseUrl}/register`,
          data: {
            username,
            password
          }
        })
        // this.$toast.success('Register success, please login')
        this.router.push('/login')
      } catch (error) {
        console.log('Error during registration:', error.response.data.message)
        this.$toast.error(error.response.data.message)
        // Vue.swal('Hello Vue world!!!')
        // VueToast.error('error bro')
        // console.log(error)
      }
    },

    async login(username, password) {
      try {
        let { data } = await axios({
          method: 'post',
          url: `${baseUrl}/login`,
          data: {
            username,
            password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.router.push('/')
        this.$toast.success('Login successfully')
      } catch (error) {
        this.$toast.error(error.response.data.message)
        console.log('Error during login:', error.response.data.message)
      }
    },

    async fetchUsers() {
      try {
        let { data } = await axios({
          method: 'get',
          url: `${baseUrl}/`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data)
        this.users = data
      } catch (error) {
        this.$toast.error(error.response.data.message)
        console.log('Error during login:', error.response.data.message)
      }
    },

    async deleteUser(id) {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${baseUrl}/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        // console.log(data)
        this.$toast.success('User deleted successfully!')
        this.fetchUsers()
      } catch (error) {
        this.$toast.error(error.response.data.message)
        console.log(error.response.data.message)
      }
    },

    async editUser(id, username) {
      console.log(id, username, '<<< Edit')
      try {
        const { data } = await axios({
          method: 'patch',
          url: `${baseUrl}/${id}`,
          headers: {
            access_token: localStorage.access_token
          },
          data: { username }
        })
        this.$toast.success('User edited successfully!')
        this.fetchUsers()
        // console.log(data, '<< editUser')
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
