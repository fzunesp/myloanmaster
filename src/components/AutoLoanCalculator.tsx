import { useState, useMemo } from 'react';
import { Card, Title, Text, Slider, Group, Stack, RingProgress, Center, Box, ActionIcon, Flex, Grid } from '@mantine/core';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(7000);
  const [tradeIn, setTradeIn] = useState(0);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(7.5);
  const [salesTax, setSalesTax] = useState(8);

  const {
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalPayment,
    totalCost,
  } = useMemo(() => {
    const taxAmount = vehiclePrice * (salesTax / 100);
    const loanAmount = Math.max(0, vehiclePrice + taxAmount - downPayment - tradeIn);
    const monthlyRate = interestRate / 100 / 12;
    const periods = loanTerm;

    let monthlyPayment = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    if (loanAmount > 0 && monthlyRate > 0 && periods > 0) {
      monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, periods) / (Math.pow(1 + monthlyRate, periods) - 1);
      totalPayment = monthlyPayment * periods;
      totalInterest = totalPayment - loanAmount;
    }

    const totalCost = downPayment + tradeIn + totalPayment;

    return { loanAmount, monthlyPayment, totalInterest, totalPayment, totalCost };
  }, [vehiclePrice, downPayment, tradeIn, loanTerm, interestRate, salesTax]);

  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 0;
  const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  const format = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <Card id="autoloan-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={3} c="white">Auto Loan Calculator</Title>
        <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('autoloan-card', 'autoloan-results')} title="Take Screenshot">
          <Camera size={20} />
        </ActionIcon>
      </Flex>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="xl" mr={{ md: 'xl' }}>
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Vehicle Price</Text>
                <Text size="lg" fw={600} c="white">${format(vehiclePrice)}</Text>
              </Group>
              <Slider value={vehiclePrice} onChange={setVehiclePrice} min={5000} max={150000} step={500} color="cyan" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Down Payment</Text>
                <Text size="lg" fw={600} c="white">${format(downPayment)}</Text>
              </Group>
              <Slider value={downPayment} onChange={setDownPayment} min={0} max={50000} step={500} color="violet" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Trade-In Value</Text>
                <Text size="lg" fw={600} c="white">${format(tradeIn)}</Text>
              </Group>
              <Slider value={tradeIn} onChange={setTradeIn} min={0} max={30000} step={500} color="orange" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(253, 126, 20, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(253, 126, 20, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Loan Term (Months)</Text>
                <Text size="lg" fw={600} c="white">{loanTerm}</Text>
              </Group>
              <Slider value={loanTerm} onChange={setLoanTerm} min={12} max={84} step={12} color="pink" size="xl" thumbSize={24} marks={[{ value: 36, label: '36' }, { value: 48, label: '48' }, { value: 60, label: '60' }, { value: 72, label: '72' }]} styles={{ track: { boxShadow: '0 0 10px rgba(230, 73, 128, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(230, 73, 128, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Interest Rate</Text>
                <Text size="lg" fw={600} c="white">{interestRate.toFixed(2)}%</Text>
              </Group>
              <Slider value={interestRate} onChange={setInterestRate} min={0} max={12} step={0.05} color="teal" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="lg" fw={500} c="white">Sales Tax</Text>
                <Text size="lg" fw={600} c="white">{salesTax}%</Text>
              </Group>
              <Slider value={salesTax} onChange={setSalesTax} min={0} max={15} step={0.5} color="gray" size="xl" thumbSize={24} marks={[{ value: 8, label: '8%' }]} styles={{ track: { boxShadow: '0 0 10px rgba(160, 174, 192, 0.3)' }, thumb: { boxShadow: '0 0 10px rgba(160, 174, 192, 0.5)' } }} />
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Center style={{ height: '100%' }}>
            <Stack align="center" gap="xl">
              <RingProgress
                size={300}
                thickness={22}
                roundCaps
                sections={[
                  { value: principalPercent, color: 'cyan', tooltip: 'Principal' },
                  { value: interestPercent, color: 'violet', tooltip: 'Interest' },
                ]}
                label={
                  <Stack gap={0} align="center">
                    <Text size="sm" c="dimmed">Monthly Payment:</Text>
                    <Text fw={700} fz={36} c="white">${format(monthlyPayment)}</Text>
                    <Text size="xs" c="dimmed" mt="xs">Loan Amount: <span style={{ color: 'white' }}>${format(loanAmount)}</span></Text>
                    <Text size="xs" c="dimmed">Total Cost: <span style={{ color: 'white' }}>${format(totalCost)}</span></Text>
                  </Stack>
                }
                rootColor="#25262b"
              />

              <Group justify="center" gap="xl" mt="md">
                <Box>
                  <Group gap="xs" mb={4}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--mantine-color-cyan-filled)' }} />
                    <Text size="sm" c="dimmed">Principal</Text>
                  </Group>
                  <Text fw={600} size="lg" c="white">${format(loanAmount)}</Text>
                  <Text size="xs" c="dimmed">{principalPercent.toFixed(1)}%</Text>
                </Box>
                <Box>
                  <Group gap="xs" mb={4}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--mantine-color-violet-filled)' }} />
                    <Text size="sm" c="dimmed">Total Interest</Text>
                  </Group>
                  <Text fw={600} size="lg" c="white">${format(totalInterest)}</Text>
                  <Text size="xs" c="dimmed">{interestPercent.toFixed(1)}%</Text>
                </Box>
              </Group>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
