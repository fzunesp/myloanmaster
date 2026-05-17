import { AppShell, Burger, Group, NavLink, Title, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Calculator, Percent, TrendingUp, PiggyBank, Home, Clock, Car, Building, RefreshCw, Info, Mail, Shield, FileText } from 'lucide-react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

import LoanCalculator from './components/LoanCalculator';
import PercentageCalculator from './components/PercentageCalculator';
import AffordabilityCalculator from './components/AffordabilityCalculator';
import InvestmentVisualizer from './components/InvestmentVisualizer';
import DebtStrategist from './components/DebtStrategist';
import RetirementCalculator from './components/RetirementCalculator';
import AutoLoanCalculator from './components/AutoLoanCalculator';
import RentVsBuyCalculator from './components/RentVsBuyCalculator';
import RefinanceCalculator from './components/RefinanceCalculator';
import AdUnit from './components/AdUnit';

import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import SEO from './components/SEO';

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my monthly mortgage payment?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Mortgage Calculator on MyLoanMaster. Enter your loan amount, interest rate, and term. The tool instantly calculates your monthly payment using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1]." }
    },
    {
      "@type": "Question",
      "name": "How much house can I afford?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Affordability Planner. Input your income, debts, and down payment. The calculator uses the 28/36 rule to estimate your maximum home price based on your debt-to-income ratio." }
    },
    {
      "@type": "Question",
      "name": "How does compound interest affect my investments?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Investment Visualizer shows how your money grows over time with compound interest. Enter your initial investment, monthly contribution, and expected annual return rate to see detailed growth projections and charts." }
    },
    {
      "@type": "Question",
      "name": "What is the best way to pay off debt?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Debt Strategist compares the avalanche method (highest interest first) and snowball method (smallest balance first). Enter your debts and it shows you the fastest payoff strategy and total interest savings for each approach." }
    },
    {
      "@type": "Question",
      "name": "Should I refinance my mortgage?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Refinance Calculator on MyLoanMaster. Enter your current loan balance, rate, and term, then compare with a new rate and term plus closing costs. The tool shows your monthly savings, break-even point in months, and total lifetime savings." }
    },
    {
      "@type": "Question",
      "name": "Is it better to rent or buy a home?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Rent vs Buy Calculator. Compare total costs including mortgage payments, property taxes, maintenance, and appreciation against rent costs and investment returns on your down payment over the loan term." }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my auto loan payment?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Auto Loan Calculator. Enter the vehicle price, down payment, trade-in value, loan term, interest rate, and sales tax. You will see your monthly payment, total interest, and a principal vs interest breakdown." }
    },
    {
      "@type": "Question",
      "name": "How much do I need to retire?",
      "acceptedAnswer": { "@type": "Answer", "text": "Use the Retirement Planner on MyLoanMaster. Enter your current age, target retirement age, current savings, and monthly contributions. Set your desired retirement income to see if your savings will last through your expected lifetime." }
    },
    {
      "@type": "Question",
      "name": "Is MyLoanMaster free to use?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. MyLoanMaster is 100% free. All calculations run locally in your browser using JavaScript — no data is sent to any server." }
    },
    {
      "@type": "Question",
      "name": "Is my financial data private?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. All calculations happen entirely in your browser. No personal or financial data is stored, transmitted, or shared with any third party." }
    },
    {
      "@type": "Question",
      "name": "Can I use MyLoanMaster on my phone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. MyLoanMaster is fully responsive and works on all devices — desktop, tablet, and mobile. All tools adapt to your screen size for a seamless experience." }
    },
    {
      "@type": "Question",
      "name": "How accurate are the calculations?",
      "acceptedAnswer": { "@type": "Answer", "text": "MyLoanMaster uses standard financial formulas for all calculations. While we strive for mathematical precision, results should be used for estimation purposes. Consult a financial professional for exact figures." }
    }
  ]
});

export default function App() {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      style={{ backgroundColor: '#0B0D14' }}
    >
      <AppShell.Header style={{ backgroundColor: '#11131a', borderBottom: '1px solid #1f2330' }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="#a0aec0" />
            <Title order={3} c="white" style={{ textShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }}>MyLoanMaster</Title>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" style={{ backgroundColor: '#11131a', borderRight: '1px solid #1f2330' }}>
        <Box mb="md">
          <Title order={6} c="dimmed" mb="sm" style={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>Calculators</Title>
          <NavLink component={Link} to="/mortgage" leftSection={<Home size={18} />} label="Mortgage Calculator" active={currentPath === '/mortgage'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/refinance" leftSection={<RefreshCw size={18} />} label="Refinance Calculator" active={currentPath === '/refinance'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/affordability" leftSection={<Calculator size={18} />} label="Affordability Planner" active={currentPath === '/affordability'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/rentbuy" leftSection={<Building size={18} />} label="Rent vs. Buy" active={currentPath === '/rentbuy'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/autoloan" leftSection={<Car size={18} />} label="Auto Loan Calculator" active={currentPath === '/autoloan'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/investment" leftSection={<TrendingUp size={18} />} label="Investment Visualizer" active={currentPath === '/investment'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/debt" leftSection={<PiggyBank size={18} />} label="Debt Strategist" active={currentPath === '/debt'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/percentage" leftSection={<Percent size={18} />} label="Quick Percentage" active={currentPath === '/percentage'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
          <NavLink component={Link} to="/retirement" leftSection={<Clock size={18} />} label="Retirement Planner" active={currentPath === '/retirement'} onClick={close} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
        </Box>

        <Box mt="auto">
          <Title order={6} c="dimmed" mb="sm" style={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}>Information</Title>
          <NavLink component={Link} to="/about" leftSection={<Info size={16} />} label="About & FAQ" active={currentPath === '/about'} onClick={close} color="cyan" variant="subtle" style={{ borderRadius: 8, marginBottom: 4 }} />
          <NavLink component={Link} to="/contact" leftSection={<Mail size={16} />} label="Contact Us" active={currentPath === '/contact'} onClick={close} color="cyan" variant="subtle" style={{ borderRadius: 8, marginBottom: 4 }} />
          <NavLink component={Link} to="/privacy" leftSection={<Shield size={16} />} label="Privacy Policy" active={currentPath === '/privacy'} onClick={close} color="cyan" variant="subtle" style={{ borderRadius: 8, marginBottom: 4 }} />
          <NavLink component={Link} to="/terms" leftSection={<FileText size={16} />} label="Terms of Service" active={currentPath === '/terms'} onClick={close} color="cyan" variant="subtle" style={{ borderRadius: 8, marginBottom: 4 }} />
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box maw={1000} mx="auto" pt="sm" px="md">
          {/* Top Ad Banner */}
          <AdUnit adSlot="1234567890" format="leaderboard" />

          <Routes>
            <Route path="/" element={<Navigate to="/mortgage" replace />} />
            
            <Route path="/mortgage" element={
              <>
                <SEO 
                  title="Mortgage Calculator | Free Monthly Payment Estimator" 
                  description="Calculate your monthly mortgage payments instantly. View amortization schedules and principal vs interest breakdowns for free." 
                  canonicalUrl="https://www.myloanmaster.com/mortgage" 
                  schema={FAQ_SCHEMA} 
                />
                <LoanCalculator />
              </>
            } />
            
            <Route path="/refinance" element={
              <>
                <SEO 
                  title="Refinance Calculator | See How Much You Can Save" 
                  description="Compare your current mortgage with a new loan to see your break-even point and lifetime savings if you refinance." 
                  canonicalUrl="https://www.myloanmaster.com/refinance" 
                />
                <RefinanceCalculator />
              </>
            } />
            
            <Route path="/affordability" element={
              <>
                <SEO 
                  title="Home Affordability Calculator | How Much House Can I Afford?" 
                  description="Enter your income and debts to find out exactly how much house you can afford based on standard lending guidelines." 
                  canonicalUrl="https://www.myloanmaster.com/affordability" 
                />
                <AffordabilityCalculator />
              </>
            } />
            
            <Route path="/rentbuy" element={
              <>
                <SEO 
                  title="Rent vs Buy Calculator | Which is Better for You?" 
                  description="Compare the long-term costs of renting versus buying a home, including maintenance, taxes, and appreciation." 
                  canonicalUrl="https://www.myloanmaster.com/rentbuy" 
                />
                <RentVsBuyCalculator />
              </>
            } />
            
            <Route path="/autoloan" element={
              <>
                <SEO 
                  title="Auto Loan Calculator | Car Payment Estimator" 
                  description="Calculate your monthly car payment, total interest, and total cost including tax and trade-in value." 
                  canonicalUrl="https://www.myloanmaster.com/autoloan" 
                />
                <AutoLoanCalculator />
              </>
            } />
            
            <Route path="/investment" element={
              <>
                <SEO 
                  title="Investment Visualizer | Compound Interest Calculator" 
                  description="See how your money grows over time with the power of compound interest. Interactive charts and projections." 
                  canonicalUrl="https://www.myloanmaster.com/investment" 
                />
                <InvestmentVisualizer />
              </>
            } />
            
            <Route path="/debt" element={
              <>
                <SEO 
                  title="Debt Payoff Calculator | Avalanche vs Snowball Method" 
                  description="Plan your debt payoff strategy. Compare the avalanche and snowball methods to save money on interest." 
                  canonicalUrl="https://www.myloanmaster.com/debt" 
                />
                <DebtStrategist />
              </>
            } />
            
            <Route path="/percentage" element={
              <>
                <SEO 
                  title="Quick Percentage Calculator | Easy Math Tool" 
                  description="Quickly calculate percentages, percentage changes, and differences with our free, instant calculator." 
                  canonicalUrl="https://www.myloanmaster.com/percentage" 
                />
                <PercentageCalculator />
              </>
            } />
            
            <Route path="/retirement" element={
              <>
                <SEO 
                  title="Retirement Calculator | Plan Your Financial Future" 
                  description="Find out if you are on track for retirement. Project your savings and see how long your money will last." 
                  canonicalUrl="https://www.myloanmaster.com/retirement" 
                />
                <RetirementCalculator />
              </>
            } />

            {/* Informational Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          {/* Bottom Ad */}
          <Box mt="xl">
            <AdUnit adSlot="3456789012" format="auto" />
          </Box>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
