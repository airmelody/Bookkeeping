import { getBillList } from "@/store/modules/billStore"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { TabBar } from "antd-mobile"
import './index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from "antd-mobile-icons"

const Bottom = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const switchRoute = (path) => {
    navigate(path)
  }
  const tabs = [
    {
      key: '/month',
      title: '月度账单',
      icon: <BillOutline />
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />
    }
  ]
  return (
    <TabBar activeKey={pathname} onChange={switchRoute}>
      {tabs.map(item =>
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
        />
      )}
    </TabBar>
  )
}


const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  return (
    <div className="layout">
      <div className="container">
        {/* 渲染子路由 */}
        <Outlet />
      </div>
      <div className="footer">
        <Bottom />
      </div>
    </div>
  )
}

export default Layout