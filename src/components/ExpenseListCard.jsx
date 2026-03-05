import './ExpenseListCard.css';

function ExpenseListCard({ expenses }) {
    if (expenses.length === 0) {
        return (
            <div className="glass-card expense-list-card empty-state">
                <h2 className="card-title">Recent Expenses</h2>
                <div className="empty-message">No expenses added yet.</div>
            </div>
        );
    }

    return (
        <div className="glass-card expense-list-card">
            <h2 className="card-title">Recent Expenses</h2>
            <div className="expense-list">
                {expenses.map((expense, index) => (
                    <div
                        key={expense.id}
                        className="expense-item animate-fade-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="expense-details">
                            <div className="expense-desc">{expense.description}</div>
                            <div className="expense-meta">Paid by {expense.paidBy} • {expense.date}</div>
                        </div>
                        <div className="expense-amount">
                            ₹{expense.amount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpenseListCard;
