export interface AmortizationRow {
  month: number;
  interestPayment: number;
  principalPayment: number;
  balance: number;
}

export function calculateAmortizedLoan(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) {
    return { payment: 0, totalInterest: 0, totalPayment: 0 };
  }

  if (annualRate === 0) {
    const payment = principal / months;
    return { payment, totalInterest: 0, totalPayment: principal };
  }

  const r = (annualRate / 100) / 12;
  const n = months;
  const payment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = payment * n;
  const totalInterest = totalPayment - principal;

  return { payment, totalInterest, totalPayment };
}

export function generateAmortizationSchedule(principal: number, annualRate: number, months: number, payment: number): AmortizationRow[] {
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  const r = (annualRate / 100) / 12;

  for (let month = 1; month <= months; month++) {
    const interestPayment = balance * r;
    let principalPayment = payment - interestPayment;

    if (month === months) {
      principalPayment = balance;
    }

    balance -= principalPayment;
    if (balance < 0) balance = 0;

    schedule.push({ month, interestPayment, principalPayment, balance });
  }

  return schedule;
}

export const PercentageMath = {
  percentOf: (x: number, y: number) => (x / 100) * y,
  isWhatPercentOf: (x: number, y: number) => y === 0 ? 0 : (x / y) * 100,
  percentageChange: (x: number, y: number) => x === 0 ? 0 : ((y - x) / x) * 100,
};

// --- NEW FUNCTIONS BELOW ---

export function calculateMaxHousePrice(monthlyPayment: number, downPayment: number, annualRate: number, years: number) {
  const r = (annualRate / 100) / 12;
  const n = years * 12;
  let principal = 0;
  if(r === 0) {
    principal = monthlyPayment * n;
  } else {
    principal = monthlyPayment * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
  }
  return principal + downPayment;
}

export interface InvestmentRow {
  year: number;
  totalContributions: number;
  totalInterest: number;
  balance: number;
}

export function calculateCompoundInterest(initial: number, monthly: number, annualRate: number, years: number): InvestmentRow[] {
  const r = annualRate / 100 / 12;
  let currentBalance = initial;
  let totalContributions = initial;
  const schedule: InvestmentRow[] = [];
  schedule.push({ year: 0, totalContributions, totalInterest: 0, balance: initial });
  
  for(let y = 1; y <= years; y++) {
    for(let m = 1; m <= 12; m++) {
      currentBalance += monthly;
      totalContributions += monthly;
      const interestForMonth = currentBalance * r;
      currentBalance += interestForMonth;
    }
    schedule.push({
      year: y,
      totalContributions,
      totalInterest: currentBalance - totalContributions,
      balance: currentBalance
    });
  }
  return schedule;
}

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface DebtPayoffLog {
  month: number;
  totalRemainingBalance: number;
}

export function calculateDebtPayoffTimeline(debts: DebtItem[], extraPayment: number, strategy: 'snowball' | 'avalanche'): DebtPayoffLog[] {
  let currentDebts = debts.map(d => ({ ...d }));
  if (strategy === 'snowball') {
      currentDebts.sort((a,b) => a.balance - b.balance);
  } else {
      currentDebts.sort((a,b) => b.interestRate - a.interestRate);
  }
  
  let month = 0;
  let totalRemainingBalance = currentDebts.reduce((acc, d) => acc + d.balance, 0);
  const timeline: DebtPayoffLog[] = [{ month, totalRemainingBalance }];

  while (totalRemainingBalance > 0 && month < 1200) { // cap at 100 years
    month++;
    
    // At the start of the month, any debt that is already at 0 stops having a required minimum payment.
    // So the base available cash is the extra payment PLUS the normal minimum payments of any still-active loans.
    // If a loan is paid off, its old minimum payment is NOT lost! It naturally rolls over into the availableCash pool for other debts!
    const activeMinimums = currentDebts.filter(d => d.balance > 0).reduce((acc, d) => acc + d.minimumPayment, 0);
    
    // However, the TRADITIONAL Snowball/Avalanche method assumes the user always budgets the SAME total amount every single month until debt-free.
    // Total budget = sum of ALL ORIGINAL minimum payments + extraPayment.
    // Let's use the true snowball total budget (Original Minimums + Extra).
    const originalTotalMinimums = debts.reduce((acc, d) => acc + d.minimumPayment, 0);
    let totalMonthlyBudget = originalTotalMinimums + extraPayment;
    let availableCash = totalMonthlyBudget;
    
    // Apply interest first
    for(let d of currentDebts) {
      if(d.balance > 0) {
         d.balance += d.balance * (d.interestRate / 100 / 12);
      }
    }
    
    // First, satisfy everyone's minimum payment
    for(let d of currentDebts) {
      if(d.balance > 0) {
        let payment = Math.min(d.balance, d.minimumPayment);
        d.balance -= payment;
        availableCash -= payment;
      }
    }
    
    // Now apply ANY leftover cash (availableCash) to the target debt based on strategy order
    for(let d of currentDebts) {
      if(d.balance > 0 && availableCash > 0) {
         let payment = Math.min(d.balance, availableCash);
         d.balance -= payment;
         availableCash -= payment;
      }
    }
    
    totalRemainingBalance = currentDebts.reduce((acc, d) => acc + d.balance, 0);
    timeline.push({ month, totalRemainingBalance });
  }
  return timeline;
}
