// 组合子模块导出store实例
import { configureStore } from '@reduxjs/toolkit'
import billReducer from './modules/billStore'

const store = configureStore({
  reducer: {
    bills: billReducer,
  }
})

export default store