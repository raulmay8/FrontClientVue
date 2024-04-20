import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import AuthService from '@/services/AuthServices'

export const useUserStore = defineStore('user', () => {
  //state
  const user = ref('') //Este valor debe asignarse desde el getUser by email pero solo si el usuario ya se logueo
  const token = ref<string | null>('');
  const service = ref() //Este valor representa a la declaración más no a la inicialización del servicio.
  //actions
  async function login(correoUsuario: string, password: string): Promise<boolean> {
    try {
      console.log(token, user, service)
      service.value = new AuthService()
      await service.value.login(correoUsuario, password)
      token.value = await service.value.getToken()
      if (token.value) {
        localStorage.setItem('token', JSON.stringify(token.value))
        return true
      } else {
        console.log('Error, no se encontró el token')
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  function logout() {
    token.value = ''
    localStorage.clear()
  }
  //getters
  const ValidToken = computed(() =>
    (token.value ? true : false) || localStorage.getItem('token') ? true : false
  )

  return { login, user, logout, ValidToken }
})
