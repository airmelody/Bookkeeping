import { NavBar, DatePicker } from "antd-mobile"
import { useEffect, useMemo, useState } from "react"
import './index.scss'
import classNames from "classnames"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import _ from "lodash"
import DailyBill from "./components/DayBill"

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector((state) => state.bills.billList)
  const monthGroup = useMemo(() => {
    // return出去计算之后的值
    return _.groupBy(billList, (item)=>dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)
  const [currentMonthList, setMonthList] = useState([])
  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter(item => item.type === 'pay')
      .reduce((pre, cur) => pre + cur.money, 0)
    const income = currentMonthList
      .filter(item => item.type === 'income')
      .reduce((pre, cur) => pre + cur.money, 0)
    const total = pay + income
      return {
        pay: pay.toFixed(2),
        income: income.toFixed(2),
        total: total.toFixed(2)
      }
  }, [currentMonthList])
  useEffect(() => {
    const nowDate = dayjs().format('YYYY-MM')
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate]||[])
    }
  }, [monthGroup])
  const onConfirm = (date) => {
    setDateVisible(false)
    const formatDate = dayjs(date).format('YYYY-MM')
    setMonthList(monthGroup[formatDate]||[])
    setCurrentDate(formatDate)
  }
  const [currentDate, setCurrentDate] = useState(() => {
    const formatDate = dayjs(new Date())
    return formatDate.format('YYYY-MM')
  })
  // 当前月按照日来做分组
  const dayGroup = useMemo(() => {
    // return出去计算之后的值
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    return {
      groupData,
      keys
    }
  }, [currentMonthList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          <div className="date" onClick={()=>setDateVisible(true)}>
            <span className="text">
              {/* 2024 | 1月账单 */}
              {currentDate+''}月账单
            </span>
            {/* <span className="arrow expand"></span> */}
            <span className={classNames('arrow', dateVisible&&'expand')}></span>
          </div>
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
            <DatePicker
              className="kaDate"
              title="记账日期"
              precision="month"
              visible={dateVisible}
              onConfirm={onConfirm}
              onCancel={()=>setDateVisible(false)}
              onClose={()=>setDateVisible(false)}
              max={new Date()}
            />
          </div>
        </div>
        {/* 单日列表统计 */}
        {
          dayGroup.keys.map(key => {
            return <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          })
        }
      </div>
    </div>
  )
}

export default Month