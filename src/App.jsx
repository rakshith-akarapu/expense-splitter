import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import MembersCard from './components/MembersCard'
import AddExpenseCard from './components/AddExpenseCard'
import ExpenseListCard from './components/ExpenseListCard'
import SummaryCard from './components/SummaryCard'
import SettlementCard from './components/SettlementCard'
import ResetButton from './components/ResetButton'
import Footer from './components/Footer'

function App() {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('split_easy_members')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('split_easy_expenses')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('split_easy_members', JSON.stringify(members))
  }, [members])

  useEffect(() => {
    localStorage.setItem('split_easy_expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleAddMember = (name) => {
    if (name.trim() && !members.includes(name.trim())) {
      setMembers([...members, name.trim()])
    }
  }

  const handleDeleteMember = (name) => {
    // Check if member has paid for any expenses
    const hasPaidExpenses = expenses.some(exp => exp.paidBy === name);

    if (hasPaidExpenses) {
      alert(`Cannot remove ${name} because they have paid for an active expense. Please clear expenses first.`);
      return;
    }

    setMembers(members.filter(m => m !== name))
  }

  const handleAddExpense = (description, amount, paidBy) => {
    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      paidBy,
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date())
    }
    setExpenses([newExpense, ...expenses])
  }

  const handleReset = () => {
    setMembers([])
    setExpenses([])
    localStorage.removeItem('split_easy_members')
    localStorage.removeItem('split_easy_expenses')
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="app-container animate-fade-up">
      <Header />
      <main className="app-grid">
        <div className="order-1 grid-left">
          <MembersCard
            members={members}
            onAddMember={handleAddMember}
            onDeleteMember={handleDeleteMember}
          />
        </div>
        <div className="order-2 grid-left">
          <AddExpenseCard
            members={members}
            onAddExpense={handleAddExpense}
          />
        </div>
        <div className="order-5 grid-left">
          <SettlementCard
            members={members}
            expenses={expenses}
          />
        </div>

        <div className="order-3 grid-right">
          <SummaryCard
            totalAmount={totalExpenses}
            expenseCount={expenses.length}
          />
        </div>
        <div className="order-4 grid-right">
          <ExpenseListCard expenses={expenses} />
        </div>
      </main>
      <ResetButton onReset={handleReset} />
      <Footer />
    </div>
  )
}

export default App
