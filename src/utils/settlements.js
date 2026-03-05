export function calculateSettlements(members, expenses) {
    if (!members || members.length < 2 || !expenses || expenses.length === 0) {
        return [];
    }

    // 1. Calculate total expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // 2. Calculate equal share per member
    const equalShare = totalExpenses / members.length;

    // 3. Compute balances for each member
    // A positive balance means the member paid MORE than their share (needs to receive money)
    // A negative balance means the member paid LESS than their share (needs to pay money)
    const balances = {};
    members.forEach(member => balances[member] = 0);

    expenses.forEach(expense => {
        if (balances[expense.paidBy] !== undefined) {
            balances[expense.paidBy] += expense.amount;
        }
    });

    members.forEach(member => {
        balances[member] -= equalShare;
    });

    // 4. Separate into creditors and debtors
    const creditors = [];
    const debtors = [];

    for (const member of members) {
        const balance = balances[member];
        if (balance > 0.01) { // use a small threshold to avoid floating point issues
            creditors.push({ name: member, amount: balance });
        } else if (balance < -0.01) {
            debtors.push({ name: member, amount: Math.abs(balance) });
        }
    }

    // Sort to optimize matching (largest debtors with largest creditors)
    creditors.sort((a, b) => b.amount - a.amount);
    debtors.sort((a, b) => b.amount - a.amount);

    // 5. Match debtors to creditors
    const settlements = [];
    let i = 0; // debtors index
    let j = 0; // creditors index

    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];

        const settlementAmount = Math.min(debtor.amount, creditor.amount);

        // Record the transaction with rounded amount to 2 decimal places
        settlements.push({
            from: debtor.name,
            to: creditor.name,
            amount: Number(settlementAmount.toFixed(2))
        });

        // Update balances
        debtor.amount -= settlementAmount;
        creditor.amount -= settlementAmount;

        // Move pointers if balance is settled
        if (debtor.amount < 0.01) i++;
        if (creditor.amount < 0.01) j++;
    }

    return settlements;
}
