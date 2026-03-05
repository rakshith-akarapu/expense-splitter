import './ResetButton.css';

function ResetButton({ onReset }) {
    const handleClick = () => {
        const confirmed = window.confirm("Are you sure you want to reset all data? This cannot be undone.");
        if (confirmed) {
            onReset();
        }
    };

    return (
        <div className="reset-container">
            <button
                className="reset-btn animate-fade-up"
                onClick={handleClick}
                aria-label="Reset All Data"
            >
                Reset All Data
            </button>
        </div>
    );
}

export default ResetButton;
