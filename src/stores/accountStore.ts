import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Account } from '@/types'

export const useAccountStore = defineStore('AccountStore', () => {
  //state
  const accountList = ref<Account[]>([])

  //getters
  const numberOfAccounts = computed(() => accountList.value.length)

  //actions
  const registerAccount = (payload: Account) => {
    accountList.value.push(payload)
  }

  return {
    accountList,
    numberOfAccounts,
    registerAccount,
  }
})
