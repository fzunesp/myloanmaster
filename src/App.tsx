import { AppShell, Burger, Group, NavLink, Title, Box, Text, Divider, Anchor, Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Calculator, Percent, TrendingUp, PiggyBank, Home, Clock, Car, Building, RefreshCw } from 'lucide-react';

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

export default function App() {
  const [opened, { toggle, close }] = useDisclosure();
  const [activeTab, setActiveTab] = useState('mortgage');

  const renderContent = () => {
    switch(activeTab) {
      case 'mortgage': return <LoanCalculator />;
      case 'affordability': return <AffordabilityCalculator />;
      case 'investment': return <InvestmentVisualizer />;
      case 'debt': return <DebtStrategist />;
      case 'percentage': return <PercentageCalculator />;
      case 'retirement': return <RetirementCalculator />;
      case 'autoloan': return <AutoLoanCalculator />;
      case 'rentbuy': return <RentVsBuyCalculator />;
      case 'refinance': return <RefinanceCalculator />;
      default: return null;
    }
  }

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
        <NavLink leftSection={<Home size={18} />} label="Mortgage Calculator" active={activeTab === 'mortgage'} onClick={() => { setActiveTab('mortgage'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Mortgage Calculator" />
        <NavLink leftSection={<RefreshCw size={18} />} label="Refinance Calculator" active={activeTab === 'refinance'} onClick={() => { setActiveTab('refinance'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Refinance Calculator" />
        <NavLink leftSection={<Calculator size={18} />} label="Affordability Planner" active={activeTab === 'affordability'} onClick={() => { setActiveTab('affordability'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Affordability Planner" />
        <NavLink leftSection={<Building size={18} />} label="Rent vs. Buy" active={activeTab === 'rentbuy'} onClick={() => { setActiveTab('rentbuy'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Rent vs Buy Calculator" />
        <NavLink leftSection={<Car size={18} />} label="Auto Loan Calculator" active={activeTab === 'autoloan'} onClick={() => { setActiveTab('autoloan'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Auto Loan Calculator" />
        <NavLink leftSection={<TrendingUp size={18} />} label="Investment Visualizer" active={activeTab === 'investment'} onClick={() => { setActiveTab('investment'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Investment Visualizer" />
        <NavLink leftSection={<PiggyBank size={18} />} label="Debt Strategist" active={activeTab === 'debt'} onClick={() => { setActiveTab('debt'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Debt Strategist" />
        <NavLink leftSection={<Percent size={18} />} label="Quick Percentage" active={activeTab === 'percentage'} onClick={() => { setActiveTab('percentage'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Quick Percentage Calculator" />
        <NavLink leftSection={<Clock size={18} />} label="Retirement Planner" active={activeTab === 'retirement'} onClick={() => { setActiveTab('retirement'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} aria-label="Retirement Calculator" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box maw={1000} mx="auto" pt="sm" px="md">

          {/* Top Ad Banner */}
          <AdUnit adSlot="1234567890" format="leaderboard" />

          {renderContent()}

          {/* Middle Ad */}
          <AdUnit adSlot="2345678901" format="rectangle" />

          {/* About & SEO Content */}
          <Box mt={80} mb="xl" style={{ backgroundColor: 'transparent', padding: '2rem 1rem' }}>
            <Title order={2} c="white" mb="sm">About MyLoanMaster</Title>
            <Text size="sm" c="dimmed" mb="md" lh={1.6}>
              MyLoanMaster is a premium, lightning-fast financial utility designed for professionals, students, and everyday use. Featuring 9 powerful tools — including Mortgage, Refinance, Affordability, Rent vs. Buy, Auto Loan, Investment, Debt Strategist, Quick Percentage, and Retirement Planning — MyLoanMaster provides exact, mathematically precise financial projections in real-time. Every calculation runs locally in your browser for maximum privacy and performance.
            </Text>
            <Text size="sm" c="dimmed" mb="md" lh={1.6}>
              Whether you're calculating monthly mortgage payments, evaluating whether to refinance, planning how much house you can afford, comparing renting vs. buying, estimating auto loan costs, visualizing investment growth, strategizing debt payoff, quickly computing percentages, or projecting your retirement savings — MyLoanMaster has you covered. All tools are free, require no signup, and process your data locally for complete privacy.
            </Text>

            <Divider my="xl" color="dark.4" />

            {/* FAQ Section */}
            <Title order={2} c="white" mb="lg">Frequently Asked Questions</Title>
            <Accordion variant="separated" mb="xl" styles={{ label: { color: '#e2e8f0', fontWeight: 500 }, content: { color: '#94a3b8', lineHeight: 1.6 } }}>
              <Accordion.Item value="mortgage-calc">
                <Accordion.Control>How do I calculate my monthly mortgage payment?</Accordion.Control>
                <Accordion.Panel>
                  Use the Mortgage Calculator. Enter your loan amount, annual interest rate, and loan term in years. The tool instantly calculates your monthly payment using the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1]. You'll also see total interest paid and a full amortization schedule.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="refinance-calc">
                <Accordion.Control>Should I refinance my mortgage?</Accordion.Control>
                <Accordion.Panel>
                  Use the Refinance Calculator. Enter your current loan balance, rate, and remaining term, then compare with a new rate, new term, and closing costs. It shows your monthly savings, break-even point in months, and total lifetime savings to help you decide if refinancing makes sense.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="affordability">
                <Accordion.Control>How much house can I afford?</Accordion.Control>
                <Accordion.Panel>
                  Use the Affordability Planner. Input your monthly budget, saved down payment, and preferred loan term. The calculator reverses the standard mortgage formula to show your maximum affordable home price based on current interest rates.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="rentbuy-calc">
                <Accordion.Control>Is it better to rent or buy a home?</Accordion.Control>
                <Accordion.Panel>
                  Use the Rent vs. Buy Calculator. Enter the home price, mortgage rate, property taxes, maintenance, and appreciation assumptions on one side, and your monthly rent plus investment return assumptions on the other. The tool compares net costs over the full loan term and shows which option saves you more money.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="autoloan-calc">
                <Accordion.Control>How do I calculate my auto loan payment?</Accordion.Control>
                <Accordion.Panel>
                  Use the Auto Loan Calculator. Enter the vehicle price, down payment, trade-in value, loan term, interest rate, and sales tax. You'll see your monthly payment, total interest, and total cost including tax — along with a principal vs. interest breakdown.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="investment">
                <Accordion.Control>How does compound interest affect my investments?</Accordion.Control>
                <Accordion.Panel>
                  The Investment Visualizer shows how your money grows over time with compound interest. Enter your initial investment, monthly contribution, and expected annual return rate to see detailed growth projections and interactive charts.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="debt">
                <Accordion.Control>What is the best way to pay off debt?</Accordion.Control>
                <Accordion.Panel>
                  The Debt Strategist compares two popular methods: the avalanche method (pay highest interest rate first to minimize total interest) and the snowball method (pay smallest balance first for psychological wins). Enter your debts with balances, rates, and minimum payments to see side-by-side comparisons and total savings.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="retirement-calc">
                <Accordion.Control>How much do I need to save for retirement?</Accordion.Control>
                <Accordion.Panel>
                  Use the Retirement Planner. Enter your current age, target retirement age, current savings, monthly contribution, and expected annual return. Then set your desired monthly retirement income and life expectancy. The calculator projects your total savings, sustainable withdrawal rate, and shows whether you're on track to meet your retirement goals.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="free">
                <Accordion.Control>Is MyLoanMaster free to use?</Accordion.Control>
                <Accordion.Panel>
                  Yes. MyLoanMaster is 100% free with no hidden fees or premium tiers. All calculations run locally in your browser using JavaScript — no data is sent to any server. We're supported by non-intrusive advertising.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="privacy">
                <Accordion.Control>Is my financial data private?</Accordion.Control>
                <Accordion.Panel>
                  Absolutely. All calculations happen entirely in your browser. No personal or financial data is stored, transmitted, or shared with any third party. When you close the page, your data is gone.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="mobile">
                <Accordion.Control>Can I use MyLoanMaster on my phone?</Accordion.Control>
                <Accordion.Panel>
                  Yes. MyLoanMaster is fully responsive and works on all devices — desktop, tablet, and mobile. All tools adapt to your screen size for a seamless experience. Bookmark it on your phone for quick access anytime.
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="accuracy">
                <Accordion.Control>How accurate are the calculations?</Accordion.Control>
                <Accordion.Panel>
                  MyLoanMaster uses standard financial formulas for all calculations. While we strive for mathematical precision, results should be used for estimation and planning purposes. For exact figures, especially for legal or contractual purposes, consult a licensed financial professional.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            <Divider my="xl" color="dark.4" />

            <Title order={2} c="white" mb="sm">Terms of Service</Title>
            <Text size="sm" c="dimmed" mb="md" lh={1.6}>
              By using MyLoanMaster ("the Tool"), you agree to these terms. The Tool is provided "as is" and "as available". While we strive for mathematical accuracy, we make no warranties regarding the absolute correctness of the calculations provided. You agree not to hold the creators liable for any errors, omissions, or damages arising from the use of this free utility. You may use the Tool for personal, educational, and commercial needs.
            </Text>

            <Title order={2} c="white" mb="sm">Privacy Policy</Title>
            <Text size="sm" c="dimmed" mb="xl" lh={1.6}>
              Your privacy is important to us. MyLoanMaster processes all calculations locally within your browser using JavaScript; no personal financial data is transmitted to or stored on our servers. <strong>Third-Party Vendors:</strong> We may use Google AdSense to display advertisements. Google uses cookies to serve ads based on a user's prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google's <Anchor href="https://www.google.com/settings/ads" target="_blank" c="cyan">Ads Settings</Anchor>.
            </Text>

            {/* Bottom Ad */}
            <AdUnit adSlot="3456789012" format="auto" />

            <Text ta="center" size="xs" c="dimmed" mt={50} style={{ opacity: 0.6 }}>
              © 2026 MyLoanMaster. All rights reserved.
            </Text>
            <Box ta="center" mt="md" style={{ opacity: 0.8 }}>
              <img src="https://hits.sh/myloanmaster.com.svg?label=Visits&color=3b82f6&labelColor=0f172a" alt="Visits"/>
            </Box>
          </Box>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
