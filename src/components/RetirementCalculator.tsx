import { useState, useMemo } from 'react';
import { Card, Title, Text, Slider, Group, Stack, Center, Box, ActionIcon, Flex, Grid, Table } from '@mantine/core';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [monthlyRetirementIncome, setMonthlyRetirementIncome] = useState(4000);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const {
    yearsWorking,
    yearsRetired,
    savingsAtRetirement,
    totalContributions,
    totalGrowth,
    monthlyWithdrawal,
    fundsLastUntilAge,
    isGoalMet,
  } = useMemo(() => {
    const yearsWorking = retirementAge - currentAge;
    const yearsRetired = lifeExpectancy - retirementAge;
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
    const periodsWorking = yearsWorking * 12;

    let savings = currentSavings;
    const totalContributions = monthlyContribution * periodsWorking;

    for (let m = 0; m < periodsWorking; m++) {
      savings = savings * (1 + monthlyReturn) + monthlyContribution;
    }

    const savingsAtRetirement = savings;
    const totalGrowth = savingsAtRetirement - currentSavings - totalContributions;

    let remaining = savingsAtRetirement;
    let monthsLasted = 0;
    let month = 0;

    while (remaining > 0 && month < yearsRetired * 12) {
      remaining = remaining * (1 + monthlyReturn) - monthlyRetirementIncome;
      monthsLasted++;
      month++;
    }

    const fundsLastUntilAge = remaining > 0 ? lifeExpectancy + 5 : Math.floor(retirementAge + monthsLasted / 12);
    const isGoalMet = remaining > 0;
    const monthlyWithdrawal = savingsAtRetirement > 0 && yearsRetired > 0
      ? (savingsAtRetirement * monthlyReturn * Math.pow(1 + monthlyReturn, yearsRetired * 12)) /
        (Math.pow(1 + monthlyReturn, yearsRetired * 12) - 1)
      : 0;

    return {
      yearsWorking,
      yearsRetired,
      savingsAtRetirement,
      totalContributions,
      totalGrowth,
      monthlyWithdrawal: Math.max(0, monthlyWithdrawal),
      fundsLastUntilAge,
      isGoalMet,
    };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, monthlyRetirementIncome, lifeExpectancy]);

  return (
    <Card id="retirement-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={3} c="white">Retirement Calculator</Title>
        <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('retirement-card', 'retirement-results')} title="Take Screenshot">
          <Camera size={20} />
        </ActionIcon>
      </Flex>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="xl" mr={{ md: 'xl' }}>
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Current Age</Text>
                <Text size="lg" fw={600} c="white">{currentAge}</Text>
              </Group>
              <Slider value={currentAge} onChange={setCurrentAge} min={18} max={60} step={1} color="cyan" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Retirement Age</Text>
                <Text size="lg" fw={600} c="white">{retirementAge}</Text>
              </Group>
              <Slider value={retirementAge} onChange={setRetirementAge} min={Math.max(currentAge + 1, 40)} max={75} step={1} color="violet" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Current Savings</Text>
                <Text size="lg" fw={600} c="white">${currentSavings.toLocaleString()}</Text>
              </Group>
              <Slider value={currentSavings} onChange={setCurrentSavings} min={0} max={500000} step={1000} color="orange" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(253, 126, 20, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(253, 126, 20, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Monthly Contribution</Text>
                <Text size="lg" fw={600} c="white">${monthlyContribution.toLocaleString()}</Text>
              </Group>
              <Slider value={monthlyContribution} onChange={setMonthlyContribution} min={0} max={10000} step={100} color="pink" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(230, 73, 128, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(230, 73, 128, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Annual Return (%)</Text>
                <Text size="lg" fw={600} c="white">{annualReturn}%</Text>
              </Group>
              <Slider value={annualReturn} onChange={setAnnualReturn} min={0} max={15} step={0.5} color="teal" size="xl" thumbSize={24} marks={[{ value: 7, label: 'Avg' }]} styles={{ track: { boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)' } }} />
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="xl">
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Desired Monthly Income</Text>
                <Text size="lg" fw={600} c="white">${monthlyRetirementIncome.toLocaleString()}</Text>
              </Group>
              <Slider value={monthlyRetirementIncome} onChange={setMonthlyRetirementIncome} min={1000} max={15000} step={100} color="cyan" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Life Expectancy</Text>
                <Text size="lg" fw={600} c="white">{lifeExpectancy}</Text>
              </Group>
              <Slider value={lifeExpectancy} onChange={setLifeExpectancy} min={Math.max(retirementAge + 5, 70)} max={100} step={1} color="violet" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' } }} />
            </Box>

            <Card shadow="none" p="lg" radius="md" style={{ backgroundColor: isGoalMet ? 'rgba(20, 184, 166, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${isGoalMet ? 'rgba(20, 184, 166, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
              <Text ta="center" size="lg" fw={700} c={isGoalMet ? 'teal' : 'red'} mb="xs">
                {isGoalMet ? 'On Track' : 'Gap Detected'}
              </Text>
              <Text ta="center" size="sm" c="dimmed">
                {isGoalMet
                  ? `Your savings will last beyond your target.`
                  : `Funds may run out around age ${fundsLastUntilAge} — you're ${yearsRetired - Math.max(0, Math.floor((savingsAtRetirement < monthlyRetirementIncome * 12) ? 0 : (savingsAtRetirement / (monthlyRetirementIncome * 12))))} years short.`
                }
              </Text>
            </Card>

            <Box>
              <Table verticalSpacing="sm" styles={{ th: { color: '#94a3b8', borderBottom: '1px solid #1f2330' }, td: { color: '#e2e8f0', borderBottom: '1px solid #1f2330' } }}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Metric</Table.Th>
                    <Table.Th ta="right">Value</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>Working years</Table.Td>
                    <Table.Td ta="right" fw={600}>{yearsWorking}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Total contributions</Table.Td>
                    <Table.Td ta="right" fw={600}>${totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Investment growth</Table.Td>
                    <Table.Td ta="right" fw={600}>${totalGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Savings at retirement</Table.Td>
                    <Table.Td ta="right" fw={700} c="cyan">${savingsAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Sustainable monthly withdrawal</Table.Td>
                    <Table.Td ta="right" fw={600}>${monthlyWithdrawal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Funds last until age</Table.Td>
                    <Table.Td ta="right" fw={600}>{fundsLastUntilAge}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Box>

            <Center>
              <Box ta="center">
                <Text size="sm" c="dimmed" mb={4}>Projected Savings at Retirement</Text>
                <Text fw={700} fz={40} c="white">${savingsAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                <Text size="xs" c="dimmed">{yearsWorking} years of saving {monthlyContribution === 0 ? '' : `$${monthlyContribution.toLocaleString()}/mo`} at {annualReturn}%</Text>
              </Box>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
