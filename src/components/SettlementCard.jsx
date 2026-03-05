import { useMemo } from 'react';
import { calculateSettlements } from '../utils/settlements';
import './SettlementCard.css';

function SettlementCard({ members, expenses }) {
    const settlements = useMemo(() => calculateSettlements(members, expenses), [members, expenses]);

    if (members.length < 2) {
        return (
            <div className="glass-card settlement-card empty-state">
                <h2 className="card-title">Final Settlement</h2>
                <div className="empty-message">Add at least 2 members to calculate settlements.</div>
            </div>
        );
    }

    if (expenses.length === 0) {
        return (
            <div className="glass-card settlement-card empty-state">
                <h2 className="card-title">Final Settlement</h2>
                <div className="empty-message">Add some expenses to see settlements.</div>
            </div>
        );
    }

    return (
        <div className="glass-card settlement-card">
            <h2 className="card-title">Final Settlement</h2>

            {settlements.length === 0 ? (
                <div className="settled-message">
                    <div className="check-icon">✓</div>
                    <span>All balances are settled.</span>
                </div>
            ) : (
                <div className="settlement-list">
                    {settlements.map((tx, index) => (
                        <div
                            key={`${tx.from}-${tx.to}-${index}`}
                            className="settlement-item animate-fade-up"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="settlement-route">
                                <span className="member-name">{tx.from}</span>
                                <span className="pays-text">pays</span>
                                <span className="member-name">{tx.to}</span>
                            </div>
                            <div className="settlement-amount">
                                ₹{tx.amount.toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SettlementCard;
