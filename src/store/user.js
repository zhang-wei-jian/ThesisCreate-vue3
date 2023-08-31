import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus';
export const useUserStore = defineStore('user', () => {


  const user = reactive({

    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    access_token: localStorage.getItem('access_token') || '213421sad',
    // access_token: localStorage.getItem('access_token') || '',





    date_joined: '',
    id: '',
    is_active: '',
    is_superuser: false,
    order_count: "",
    update_time: "",
    // username: "",
    yu_e: 0,

  })

  function setUserStore({ username, password, access_token }) {
    user.username = username
    user.password = password
    user.token = access_token

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    localStorage.setItem('access_token', access_token)

  }

  function setUserInfo({ is_superuser, date_joined, id, is_active, order_count, update_time, username, yu_e }) {
    user.is_superuser = is_superuser
    user.date_joined = date_joined
    user.id = id
    user.is_active = is_active
    user.order_count = order_count
    user.update_time = update_time
    user.username = username
    user.yu_e = yu_e



  }

  function removeUserStore() {
    user.username = ''
    user.password = ''
    user.token = ''
    localStorage.setItem('username', '')
    localStorage.setItem('password', '')
    localStorage.setItem('access_token', '')

    ElMessage.success('退出成功')
  }

  return {
    user,
    removeUserStore,
    setUserStore,
    setUserInfo
  }
})
