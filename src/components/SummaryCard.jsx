import './SummaryCard.css';

function SummaryCard({ totalAmount, expenseCount }) {
    return (
        <div className="glass-card summary-card">
            <h2 className="card-title">Total Expenses</h2>
            <div className="total-amount">
                <span className="currency">₹</span>
                <span className="amount">{totalAmount.toFixed(2)}</span>
            </div>
            <p className="summary-subtitle">
                {expenseCount === 1
                    ? 'We settled 1 expense this month'
                    : `We settled ${expenseCount} expenses this month`}
            </p>
        </div>
    );
}

export default SummaryCard;
