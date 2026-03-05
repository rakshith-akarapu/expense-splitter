import { useState } from 'react';
import './AddExpenseCard.css';

function AddExpenseCard({ members, onAddExpense }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState(members[0] || '');

    // Derive the valid paidBy from props during render instead of syncing in an effect
    // This avoids cascading renders and fixing the set-state-in-effect lint warning.
    const validPaidBy = members.includes(paidBy) ? paidBy : (members[0] || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (description && amount && validPaidBy) {
            onAddExpense(description, amount, validPaidBy);
            setDescription('');
            setAmount('');
        }
    };

    return (
        <div className="glass-card add-expense-card">
            <h2 className="card-title">Add New Expense</h2>
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Dinner, Taxi, etc."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Amount</label>
                        <input
                            type="number"
                            className="glass-input"
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Paid By</label>
                        <select
                            className="glass-select"
                            value={validPaidBy}
                            onChange={(e) => setPaidBy(e.target.value)}
                            disabled={members.length === 0}
                            required
                        >
                            {members.map(member => (
                                <option key={member} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="primary-btn full-width-btn" disabled={members.length === 0}>
                    Split Expense
                </button>
            </form>
        </div>
    );
}

export default AddExpenseCard;
