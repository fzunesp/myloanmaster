import { AppShell, Burger, Group, NavLink, Title, Box, Text, Divider, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Calculator, Percent, TrendingUp, PiggyBank, Home } from 'lucide-react';

import LoanCalculator from './components/LoanCalculator';
import PercentageCalculator from './components/PercentageCalculator';
import AffordabilityCalculator from './components/AffordabilityCalculator';
import InvestmentVisualizer from './components/InvestmentVisualizer';
import DebtStrategist from './components/DebtStrategist';

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
        <NavLink leftSection={<Home size={18} />} label="Mortgage Calculator" active={activeTab === 'mortgage'} onClick={() => { setActiveTab('mortgage'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
        <NavLink leftSection={<Calculator size={18} />} label="Affordability Planner" active={activeTab === 'affordability'} onClick={() => { setActiveTab('affordability'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
        <NavLink leftSection={<TrendingUp size={18} />} label="Investment Visualizer" active={activeTab === 'investment'} onClick={() => { setActiveTab('investment'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
        <NavLink leftSection={<PiggyBank size={18} />} label="Debt Strategist" active={activeTab === 'debt'} onClick={() => { setActiveTab('debt'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
        <NavLink leftSection={<Percent size={18} />} label="Quick Percentage" active={activeTab === 'percentage'} onClick={() => { setActiveTab('percentage'); close(); }} color="cyan" variant="light" style={{ borderRadius: 8, marginBottom: 8 }} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Box maw={1000} mx="auto" pt="sm" px="md">
          {renderContent()}

          <Box mt={80} mb="xl" style={{ backgroundColor: 'transparent', padding: '2rem 1rem' }}>
             <Title order={4} c="white" mb="sm">About MyLoanMaster</Title>
             <Text size="sm" c="dimmed" mb="md" lh={1.6}>
               MyLoanMaster is a premium, lightning-fast financial utility designed for professionals, students, and everyday use. Featuring 5 distinct tracking tools—including Mortgage, Affordability, Investment, and Debt Strategist—MyLoanMaster provides exact, mathematically precise financial projections in real-time. Our tool operates entirely locally in your browser for maximum privacy and performance.
             </Text>
             
             <Divider my="xl" color="dark.4" />
             
             <Title order={4} c="white" mb="sm">Terms of Service</Title>
             <Text size="sm" c="dimmed" mb="md" lh={1.6}>
               By using MyLoanMaster ("the Tool"), you agree to these terms. The Tool is provided "as is" and "as available". While we strive for mathematical accuracy, we make no warranties regarding the absolute correctness of the calculations provided. You agree not to hold the creators liable for any errors, omissions, or damages arising from the use of this free utility. You may use the Tool for personal, educational, and commercial needs.
             </Text>
             
             <Title order={4} c="white" mb="sm">Privacy Policy</Title>
             <Text size="sm" c="dimmed" mb="xl" lh={1.6}>
               Your privacy is important to us. MyLoanMaster processes all calculations locally within your browser using JavaScript; no personal financial data is transmitted to or stored on our servers. <strong>Third-Party Vendors:</strong> We may use Google AdSense to display advertisements. Google uses cookies to serve ads based on a user's prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google's <Anchor href="https://www.google.com/settings/ads" target="_blank" c="cyan">Ads Settings</Anchor>.
             </Text>
             
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
