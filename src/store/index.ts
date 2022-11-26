import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { IUserInfo } from '@/api/types/common'
import { setItem, getItem } from '@/utils/storage'
import { USER_INFO } from '@/utils/constants'

const state = {
  isCollapse: false,
  userInfo: getItem<IUserInfo>(USER_INFO)
  // userInfo: JSON.parse(window.localStorage.getItem('userInfo') || 'null') as IUserInfo | null
}

// 通过typeof来推断出类型并导出类型给 $store 用
export type State = typeof state

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    setIsCollapse (state) {
      state.isCollapse = !state.isCollapse
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
      setItem(USER_INFO, state.userInfo)
      // window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  }
})

// 定义自己的 `useStore` 组合式函数
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useStore = () => baseUseStore(key)
