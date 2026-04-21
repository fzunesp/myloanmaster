import { useState, useMemo } from 'react';
import { Card, Title, Text, Slider, Group, Stack, RingProgress, Center, Box, ActionIcon, Flex } from '@mantine/core';
import { calculateMaxHousePrice } from '../utils/financialMath';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function AffordabilityCalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState(2500);
  const [downPayment, setDownPayment] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.85);

  const maxPrice = useMemo(() => {
    return calculateMaxHousePrice(monthlyBudget, downPayment, interestRate, loanTerm);
  }, [monthlyBudget, downPayment, loanTerm, interestRate]);

  const downPaymentPercent = maxPrice > 0 ? ((downPayment / maxPrice) * 100).toFixed(1) : 0;
  const principalPercent = maxPrice > 0 ? 100 - Number(downPaymentPercent) : 0;

  return (
    <Card id="affordability-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={3} c="white">Affordability Reverse-Calculator</Title>
        <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('affordability-card', 'affordability-results')} title="Take Screenshot">
          <Camera size={20} />
        </ActionIcon>
      </Flex>
      
      <Stack gap="xl">
        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="lg" fw={500} c="white">Max Monthly Payment</Text>
            <Text size="lg" fw={600} c="white">${monthlyBudget.toLocaleString()}</Text>
          </Group>
          <Slider 
            value={monthlyBudget} 
            onChange={setMonthlyBudget} 
            min={500} max={15000} step={100} 
            color="cyan" size="xl" thumbSize={24}
          />
        </Box>

        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="lg" fw={500} c="white">Saved Down Payment</Text>
            <Text size="lg" fw={600} c="white">${downPayment.toLocaleString()}</Text>
          </Group>
          <Slider 
            value={downPayment} 
            onChange={setDownPayment} 
            min={0} max={500000} step={1000} 
            color="violet" size="xl" thumbSize={24}
          />
        </Box>

        <Box>
          <Group justify="space-between" mb="xs">
            <Text size="lg" fw={500} c="white">Loan Term (Years)</Text>
            <Text size="lg" fw={600} c="white">{loanTerm}</Text>
          </Group>
          <Slider 
            value={loanTerm} onChange={setLoanTerm} 
            min={10} max={30} step={5} 
            color="orange" size="xl" thumbSize={24}
          />
        </Box>

        <Box>
           <Group justify="space-between" mb="xs">
            <Text size="lg" fw={500} c="white">Interest Rate</Text>
            <Text size="lg" fw={600} c="white">{interestRate.toFixed(2)}%</Text>
          </Group>
          <Slider 
            value={interestRate} onChange={setInterestRate} 
            min={0} max={10} step={0.05} 
            color="pink" size="xl" thumbSize={24}
          />
        </Box>

        <Center mt="md">
          <RingProgress
            size={280}
            thickness={20}
            roundCaps
            sections={[
              { value: Number(downPaymentPercent), color: 'violet', tooltip: 'Down Payment' },
              { value: principalPercent, color: 'cyan', tooltip: 'Financed Amount' },
            ]}
            label={
              <Stack gap={0} align="center">
                <Text size="sm" c="dimmed">Max House Price</Text>
                <Text fw={700} fz={32} c="white">${maxPrice.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</Text>
              </Stack>
            }
          />
        </Center>
      </Stack>
    </Card>
  );
}
