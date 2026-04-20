import { useState, useEffect } from 'react';
import { Card, Title, Text, Slider, Group, Stack, RingProgress, Center, Flex, Grid, Paper, Box, ActionIcon } from '@mantine/core';
import { calculateAmortizedLoan, generateAmortizationSchedule } from '../utils/financialMath';
import type { AmortizationRow } from '../utils/financialMath';
import AmortizationChart from './AmortizationChart';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function LoanCalculator() {
  const [housePrice, setHousePrice] = useState(1250000);
  const [downPayment, setDownPayment] = useState(250000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.85);

  const principal = Math.max(0, housePrice - downPayment);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);

  useEffect(() => {
    const { payment, totalInterest, totalPayment } = calculateAmortizedLoan(principal, interestRate, loanTerm * 12);
    setEmi(payment);
    setTotalInterest(totalInterest);
    setTotalPayment(totalPayment);
    // Recalculating schedule only when needed
    setSchedule(generateAmortizationSchedule(principal, interestRate, loanTerm * 12, payment));
  }, [housePrice, downPayment, loanTerm, interestRate, principal]);

  const downPaymentPercent = housePrice > 0 ? ((downPayment / housePrice) * 100).toFixed(0) : 0;
  
  const principalPercent = totalPayment > 0 ? (principal / totalPayment) * 100 : 0;
  const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return (
    <Stack gap="xl">
      <Card id="loan-card" shadow="none" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={3} c="white">Mortgage Calculator</Title>
          <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('loan-card', 'mortgage-results')} title="Take Screenshot">
            <Camera size={20} />
          </ActionIcon>
        </Flex>
        
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl" mr={{ md: 'xl' }}>
              
              {/* House Price */}
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="lg" fw={500} c="white">House Price</Text>
                  <Text size="lg" fw={600} c="white">${housePrice.toLocaleString()}</Text>
                </Group>
                <Slider 
                  value={housePrice} 
                  onChange={setHousePrice} 
                  min={100000} 
                  max={3000000} 
                  step={10000} 
                  color="cyan"
                  size="xl"
                  thumbSize={24}
                  styles={{
                    track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' },
                    thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' }
                  }}
                />
                <Group justify="flex-end" mt="xs">
                  <Text size="xs" c="dimmed">$100K - $3M</Text>
                </Group>
              </Box>

              {/* Down Payment */}
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="lg" fw={500} c="white">Down Payment</Text>
                  <Text size="lg" fw={600} c="white">${downPayment.toLocaleString()} / {downPaymentPercent}%</Text>
                </Group>
                <Slider 
                  value={downPayment} 
                  onChange={setDownPayment} 
                  min={0} 
                  max={1000000} 
                  step={5000} 
                  color="violet"
                  size="xl"
                  thumbSize={24}
                  styles={{
                    track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' },
                    thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' }
                  }}
                />
                <Group justify="flex-end" mt="xs">
                  <Text size="xs" c="dimmed">$0 - $1M</Text>
                </Group>
              </Box>

              {/* Loan Term */}
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="lg" fw={500} c="white">Loan Term</Text>
                  <Text size="lg" fw={600} c="white">{loanTerm} Years</Text>
                </Group>
                <Slider 
                  value={loanTerm} 
                  onChange={setLoanTerm} 
                  min={10} 
                  max={30} 
                  step={5} 
                  color="orange"
                  size="xl"
                  thumbSize={24}
                  marks={[
                    { value: 10, label: '10' },
                    { value: 15, label: '15' },
                    { value: 20, label: '20' },
                    { value: 30, label: '30' },
                  ]}
                  styles={{
                    track: { boxShadow: '0 0 10px rgba(253, 126, 20, 0.5)' },
                    thumb: { boxShadow: '0 0 15px rgba(253, 126, 20, 0.8)' }
                  }}
                />
              </Box>

              {/* Interest Rate */}
              <Box mt="md">
                <Group justify="space-between" mb="xs">
                  <Text size="lg" fw={500} c="white">Interest Rate</Text>
                  <Text size="lg" fw={600} c="white">{interestRate.toFixed(2)}%</Text>
                </Group>
                <Slider 
                  value={interestRate} 
                  onChange={setInterestRate} 
                  min={0} 
                  max={10} 
                  step={0.05} 
                  color="pink"
                  size="xl"
                  thumbSize={24}
                  styles={{
                    track: { boxShadow: '0 0 10px rgba(230, 73, 128, 0.5)' },
                    thumb: { boxShadow: '0 0 15px rgba(230, 73, 128, 0.8)' }
                  }}
                />
                <Group justify="space-between" mt="xs">
                  <Text size="xs" c="dimmed">0%</Text>
                  <Text size="xs" c="dimmed">0% - 10%</Text>
                </Group>
              </Box>

            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Center style={{ height: '100%' }}>
              <Stack align="center" gap="xl">
                <RingProgress
                  size={320}
                  thickness={24}
                  roundCaps
                  sections={[
                    { value: principalPercent, color: 'cyan', tooltip: 'Principal' },
                    { value: interestPercent, color: 'violet', tooltip: 'Interest' },
                  ]}
                  label={
                    <Stack gap={0} align="center">
                      <Text size="sm" c="dimmed">Monthly Payment:</Text>
                      <Text fw={700} fz={40} c="white">${emi.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</Text>
                      <Text size="xs" c="dimmed" mt="xs">Total Loan: <span style={{ color: 'white' }}>${principal.toLocaleString()}</span></Text>
                      <Text size="xs" c="dimmed">Total Payment: <span style={{ color: 'white' }}>${totalPayment.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</span></Text>
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
                    <Text fw={600} size="lg" c="white">${principal.toLocaleString()}</Text>
                    <Text size="xs" c="dimmed">{principalPercent.toFixed(1)}%</Text>
                  </Box>
                  <Box>
                    <Group gap="xs" mb={4}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--mantine-color-violet-filled)' }} />
                      <Text size="sm" c="dimmed">Total Interest</Text>
                    </Group>
                    <Text fw={600} size="lg" c="white">${totalInterest.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</Text>
                    <Text size="xs" c="dimmed">{interestPercent.toFixed(1)}%</Text>
                  </Box>
                </Group>
              </Stack>
            </Center>
          </Grid.Col>
        </Grid>
      </Card>

      <AmortizationChart data={schedule} />

    </Stack>
  );
}
