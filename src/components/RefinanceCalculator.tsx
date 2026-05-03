import { useState, useMemo } from 'react';
import { Card, Title, Text, Slider, Group, Stack, Center, Box, ActionIcon, Flex, Grid } from '@mantine/core';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [remainingTerm, setRemainingTerm] = useState(25);
  const [newRate, setNewRate] = useState(6.0);
  const [newTerm, setNewTerm] = useState(25);
  const [closingCosts, setClosingCosts] = useState(6000);

  const {
    currentMonthly,
    currentTotalRemaining,
    currentInterestRemaining,
    newMonthly,
    newTotalRemaining,
    newInterestRemaining,
    monthlySavings,
    breakEvenMonths,
    totalSavings,
    isWorthIt,
  } = useMemo(() => {
    const currentMonthlyRate = currentRate / 100 / 12;
    const currentPeriods = remainingTerm * 12;
    const newMonthlyRate = newRate / 100 / 12;
    const newPeriods = newTerm * 12;

    const currentMonthly = currentBalance > 0 && currentMonthlyRate > 0 && currentPeriods > 0
      ? currentBalance * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentPeriods) / (Math.pow(1 + currentMonthlyRate, currentPeriods) - 1)
      : 0;

    const currentTotalRemaining = currentMonthly * currentPeriods;
    const currentInterestRemaining = currentTotalRemaining - currentBalance;

    const newMonthly = currentBalance > 0 && newMonthlyRate > 0 && newPeriods > 0
      ? currentBalance * newMonthlyRate * Math.pow(1 + newMonthlyRate, newPeriods) / (Math.pow(1 + newMonthlyRate, newPeriods) - 1)
      : 0;

    const newTotalRemaining = newMonthly * newPeriods;
    const newInterestRemaining = newTotalRemaining - currentBalance;

    const monthlySavings = currentMonthly - newMonthly;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : -1;

    const totalSavings = (currentTotalRemaining) - (newTotalRemaining + closingCosts);
    const isWorthIt = totalSavings > 0;

    return {
      currentMonthly,
      currentTotalRemaining,
      currentInterestRemaining,
      newMonthly,
      newTotalRemaining,
      newInterestRemaining,
      monthlySavings,
      breakEvenMonths,
      totalSavings,
      isWorthIt,
    };
  }, [currentBalance, currentRate, remainingTerm, newRate, newTerm, closingCosts]);

  const format = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <Card id="refinance-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={3} c="white">Refinance Calculator</Title>
        <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('refinance-card', 'refinance-results')} title="Take Screenshot">
          <Camera size={20} />
        </ActionIcon>
      </Flex>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={5} c="dimmed" mb="md">Current Loan</Title>
          <Stack gap="xl" mr={{ md: 'xl' }}>
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Current Balance</Text>
                <Text size="lg" fw={600} c="white">${format(currentBalance)}</Text>
              </Group>
              <Slider value={currentBalance} onChange={setCurrentBalance} min={10000} max={2000000} step={5000} color="cyan" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Current Interest Rate</Text>
                <Text size="lg" fw={600} c="white">{currentRate.toFixed(1)}%</Text>
              </Group>
              <Slider value={currentRate} onChange={setCurrentRate} min={2} max={12} step={0.1} color="violet" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Remaining Term (Years)</Text>
                <Text size="lg" fw={600} c="white">{remainingTerm}</Text>
              </Group>
              <Slider value={remainingTerm} onChange={setRemainingTerm} min={1} max={30} step={1} color="orange" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(253, 126, 20, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(253, 126, 20, 0.8)' } }} />
            </Box>

            <Card shadow="none" p="md" radius="md" style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">Current Monthly</Text>
                <Text size="sm" fw={600} c="white">${format(currentMonthly)}</Text>
              </Group>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">Total Remaining Cost</Text>
                <Text size="sm" fw={600} c="white">${format(currentTotalRemaining)}</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Remaining Interest</Text>
                <Text size="sm" fw={600} c="violet">${format(currentInterestRemaining)}</Text>
              </Group>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={5} c="dimmed" mb="md">New Loan</Title>
          <Stack gap="xl">
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">New Interest Rate</Text>
                <Text size="lg" fw={600} c="white">{newRate.toFixed(1)}%</Text>
              </Group>
              <Slider value={newRate} onChange={setNewRate} min={1} max={10} step={0.1} color="teal" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">New Term (Years)</Text>
                <Text size="lg" fw={600} c="white">{newTerm}</Text>
              </Group>
              <Slider value={newTerm} onChange={setNewTerm} min={newTerm > 0 ? Math.max(1, remainingTerm - 5) : 10} max={30} step={1} color="pink" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(230, 73, 128, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(230, 73, 128, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Total Closing Costs</Text>
                <Text size="lg" fw={600} c="white">${format(closingCosts)}</Text>
              </Group>
              <Slider value={closingCosts} onChange={setClosingCosts} min={0} max={20000} step={500} color="gray" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(160, 174, 192, 0.3)' }, thumb: { boxShadow: '0 0 10px rgba(160, 174, 192, 0.5)' } }} />
            </Box>

            <Card shadow="none" p="md" radius="md" style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">New Monthly</Text>
                <Text size="sm" fw={600} c="cyan">${format(newMonthly)}</Text>
              </Group>
              <Group justify="space-between" mb={4}>
                <Text size="sm" c="dimmed">Total New Cost</Text>
                <Text size="sm" fw={600} c="white">${format(newTotalRemaining)}</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">New Interest</Text>
                <Text size="sm" fw={600} c="violet">${format(newInterestRemaining)}</Text>
              </Group>
            </Card>

            <Card shadow="none" p="lg" radius="md" mt="sm" style={{ backgroundColor: isWorthIt ? 'rgba(20, 184, 166, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${isWorthIt ? 'rgba(20, 184, 166, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
              <Text ta="center" size="lg" fw={700} c={isWorthIt ? 'teal' : 'orange'} mb="sm">
                {isWorthIt ? 'Refinancing is Worth It' : 'Not Worth Refinancing'}
              </Text>
              <Group grow gap="md">
                <Box ta="center">
                  <Text size="xs" c="dimmed">Monthly Savings</Text>
                  <Text fw={700} c={monthlySavings > 0 ? 'teal' : 'red'} size="lg">{monthlySavings > 0 ? '+' : ''}${format(Math.abs(monthlySavings))}</Text>
                </Box>
                <Box ta="center">
                  <Text size="xs" c="dimmed">Break-Even</Text>
                  <Text fw={700} c="white" size="lg">{breakEvenMonths > 0 ? `${breakEvenMonths} months` : 'N/A'}</Text>
                  <Text size="xs" c="dimmed">{breakEvenMonths > 0 ? `(${(breakEvenMonths / 12).toFixed(1)} years)` : ''}</Text>
                </Box>
                <Box ta="center">
                  <Text size="xs" c="dimmed">Total Savings</Text>
                  <Text fw={700} c={totalSavings > 0 ? 'teal' : 'red'} size="lg">{totalSavings > 0 ? '+' : ''}${format(Math.abs(totalSavings))}</Text>
                </Box>
              </Group>
            </Card>

            <Center>
              <Box ta="center">
                <Text size="sm" c="dimmed" mb={4}>Monthly Payment Comparison</Text>
                <Group gap="xl" justify="center">
                  <Box ta="center">
                    <Text size="xs" c="dimmed">Before</Text>
                    <Text fw={700} fz={28} c="white">${format(currentMonthly)}</Text>
                  </Box>
                  <Box ta="center">
                    <Text size="xs" c="dimmed">After</Text>
                    <Text fw={700} fz={28} c="cyan">${format(newMonthly)}</Text>
                  </Box>
                </Group>
              </Box>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
