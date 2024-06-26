import classNames from 'classnames'
const { useMemo } = require("react")

const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.amount, 0)
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.amount, 0)
    return {
      pay,
      income,
      total: pay + income
    }
  }, [billList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">
            {date}
          </span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyBill