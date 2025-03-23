import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Account } from '@/types'

export const useAccountStore = defineStore('AccountStore', () => {
  // state
  const accountList = ref<Account[]>([])
  const authenticatedUser = ref<Account | null>(null)

  // getters
  const numberOfAccounts = computed(() => accountList.value.length)
  const isAuthenticated = computed(() => authenticatedUser.value !== null)

  // actions
  const registerAccount = (payload: Account) => {
    accountList.value.push(payload)
  }

  const login = (username: string, password: string) => {
    console.log('Checking credentials:', username, password)
    console.log('Account list:', accountList.value)
    const account = accountList.value.find(account => account.username === username && account.password === password)
    if (account) {
      authenticatedUser.value = account
      console.log('Login successful:', account)
      return true
    } else {
      console.log('Login failed: No matching account found')
      return false
    }
  }

  const logout = () => {
    authenticatedUser.value = null
  }

  return {
    accountList,
    numberOfAccounts,
    authenticatedUser,
    isAuthenticated,
    registerAccount,
    login,
    logout
  }
})
