function calculateProfit() {
    const revenue = document.getElementById('revenue').value;
    const expense = document.getElementById('expense').value;
    const profit = revenue - expense;
    
    const result = document.getElementById('result');
    result.innerHTML = `Profit Bersih: Rp${profit}`;
}
