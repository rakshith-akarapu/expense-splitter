import { useState } from 'react';
import './MembersCard.css';

function MembersCard({ members, onAddMember, onDeleteMember }) {
    const [newMember, setNewMember] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        onAddMember(newMember);
        setNewMember('');
    };

    return (
        <div className="glass-card members-card">
            <h2 className="card-title">Group Members</h2>
            <form className="add-member-form" onSubmit={handleAdd}>
                <input
                    type="text"
                    className="glass-input"
                    placeholder="Enter name..."
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                />
                <button type="submit" className="primary-btn">Add</button>
            </form>
            <div className="members-list">
                {members.map((member) => (
                    <div key={member} className="member-chip animate-scale-in">
                        <span>{member}</span>
                        <button
                            className="delete-chip-btn"
                            onClick={() => onDeleteMember(member)}
                            type="button"
                            aria-label={`Remove ${member}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MembersCard;
