import { useState, useMemo } from 'react';
import { Card, Title, Text, Slider, Group, Stack, Center, Box, ActionIcon, Flex, Grid } from '@mantine/core';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [annualMaintenancePercent, setAnnualMaintenancePercent] = useState(1);
  const [annualAppreciation, setAnnualAppreciation] = useState(3);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [rentIncrease, setRentIncrease] = useState(3);
  const [investmentReturn, setInvestmentReturn] = useState(7);

  const {
    downPaymentAmount,
    totalMonthlyBuying,
    totalCostBuying,
    totalCostRenting,
    netDifference,
  } = useMemo(() => {
    const years = loanTerm;
    const downPaymentAmount = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPaymentAmount;
    const monthlyRate = mortgageRate / 100 / 12;
    const periods = years * 12;

    const monthlyMortgage = loanAmount > 0 && monthlyRate > 0
      ? loanAmount * monthlyRate * Math.pow(1 + monthlyRate, periods) / (Math.pow(1 + monthlyRate, periods) - 1)
      : 0;

    const monthlyPropertyTax = homePrice * (propertyTaxRate / 100) / 12;
    const monthlyMaintenance = homePrice * (annualMaintenancePercent / 100) / 12;
    const totalMonthlyBuying = monthlyMortgage + monthlyPropertyTax + monthlyMaintenance;

    let cumulativeBuying = downPaymentAmount;
    let houseValue = homePrice;
    let investmentBalance = downPaymentAmount;
    let currentRent = monthlyRent;
    const monthlyRentIncrease = Math.pow(1 + rentIncrease / 100, 1 / 12) - 1;
    const monthlyInvestReturn = Math.pow(1 + investmentReturn / 100, 1 / 12) - 1;
    const monthlyAppRate = Math.pow(1 + annualAppreciation / 100, 1 / 12) - 1;
    let monthlySavings = Math.max(0, totalMonthlyBuying - currentRent);

    let buyingCheaperYear: number | null = null;

    for (let m = 0; m < periods; m++) {
      cumulativeBuying += totalMonthlyBuying;
      houseValue *= (1 + monthlyAppRate);

      currentRent *= (1 + monthlyRentIncrease);

      monthlySavings = Math.max(0, totalMonthlyBuying - currentRent);
      investmentBalance = investmentBalance * (1 + monthlyInvestReturn) + monthlySavings;

      if (buyingCheaperYear === null && investmentBalance > (cumulativeBuying - houseValue)) {
        buyingCheaperYear = Math.floor(m / 12);
      }
    }

    const adjustedCumulativeBuying = cumulativeBuying - houseValue;

    const investingAfterYears = investmentBalance;
    const netDifference = Math.abs(adjustedCumulativeBuying - investingAfterYears);
    const totalCostBuying = adjustedCumulativeBuying;
    const totalCostRenting = investingAfterYears;

    return {
      downPaymentAmount,
      totalMonthlyBuying,
      totalCostBuying,
      totalCostRenting,
      netDifference,
    };
  }, [homePrice, downPaymentPercent, mortgageRate, loanTerm, propertyTaxRate, annualMaintenancePercent, annualAppreciation, monthlyRent, rentIncrease, investmentReturn]);

  const buyIsBetter = totalCostBuying < totalCostRenting;
  const format = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <Card id="rentbuy-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={3} c="white">Rent vs. Buy Calculator</Title>
        <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('rentbuy-card', 'rentbuy-results')} title="Take Screenshot">
          <Camera size={20} />
        </ActionIcon>
      </Flex>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={5} c="dimmed" mb="md">Buying Costs</Title>
          <Stack gap="lg" mr={{ md: 'xl' }}>
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Home Price</Text>
                <Text size="sm" fw={600} c="white">${format(homePrice)}</Text>
              </Group>
              <Slider value={homePrice} onChange={setHomePrice} min={50000} max={2000000} step={10000} color="cyan" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Down Payment</Text>
                <Text size="sm" fw={600} c="white">{downPaymentPercent}% (${format(downPaymentAmount)})</Text>
              </Group>
              <Slider value={downPaymentPercent} onChange={setDownPaymentPercent} min={5} max={50} step={5} color="violet" size="xl" thumbSize={24} marks={[{ value: 20, label: '20%' }]} styles={{ track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Mortgage Rate</Text>
                <Text size="sm" fw={600} c="white">{mortgageRate.toFixed(1)}%</Text>
              </Group>
              <Slider value={mortgageRate} onChange={setMortgageRate} min={1} max={10} step={0.1} color="orange" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(253, 126, 20, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(253, 126, 20, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Loan Term (Years)</Text>
                <Text size="sm" fw={600} c="white">{loanTerm}</Text>
              </Group>
              <Slider value={loanTerm} onChange={setLoanTerm} min={10} max={30} step={5} color="pink" size="xl" thumbSize={24} marks={[{ value: 15, label: '15' }, { value: 30, label: '30' }]} styles={{ track: { boxShadow: '0 0 10px rgba(230, 73, 128, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(230, 73, 128, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Property Tax Rate</Text>
                <Text size="sm" fw={600} c="white">{propertyTaxRate.toFixed(1)}%</Text>
              </Group>
              <Slider value={propertyTaxRate} onChange={setPropertyTaxRate} min={0} max={3} step={0.1} color="teal" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Annual Maintenance</Text>
                <Text size="sm" fw={600} c="white">{annualMaintenancePercent}%</Text>
              </Group>
              <Slider value={annualMaintenancePercent} onChange={setAnnualMaintenancePercent} min={0.5} max={3} step={0.1} color="gray" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(160, 174, 192, 0.3)' }, thumb: { boxShadow: '0 0 10px rgba(160, 174, 192, 0.5)' } }} />
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={5} c="dimmed" mb="md">Renting Costs & Market Assumptions</Title>
          <Stack gap="lg">
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Monthly Rent</Text>
                <Text size="sm" fw={600} c="white">${format(monthlyRent)}</Text>
              </Group>
              <Slider value={monthlyRent} onChange={setMonthlyRent} min={500} max={10000} step={100} color="cyan" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(34, 184, 207, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(34, 184, 207, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Annual Rent Increase</Text>
                <Text size="sm" fw={600} c="white">{rentIncrease}%</Text>
              </Group>
              <Slider value={rentIncrease} onChange={setRentIncrease} min={0} max={8} step={0.5} color="violet" size="xl" thumbSize={24} styles={{ track: { boxShadow: '0 0 10px rgba(132, 94, 247, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(132, 94, 247, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Annual Home Appreciation</Text>
                <Text size="sm" fw={600} c="white">{annualAppreciation}%</Text>
              </Group>
              <Slider value={annualAppreciation} onChange={setAnnualAppreciation} min={0} max={8} step={0.5} color="orange" size="xl" thumbSize={24} marks={[{ value: 3, label: '3%' }]} styles={{ track: { boxShadow: '0 0 10px rgba(253, 126, 20, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(253, 126, 20, 0.8)' } }} />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={500} c="white">Investment Return (if renting)</Text>
                <Text size="sm" fw={600} c="white">{investmentReturn}%</Text>
              </Group>
              <Slider value={investmentReturn} onChange={setInvestmentReturn} min={0} max={15} step={0.5} color="teal" size="xl" thumbSize={24} marks={[{ value: 7, label: '7%' }]} styles={{ track: { boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' }, thumb: { boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)' } }} />
            </Box>

            <Card shadow="none" p="lg" radius="md" mt="md" style={{ backgroundColor: buyIsBetter ? 'rgba(20, 184, 166, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1px solid ${buyIsBetter ? 'rgba(20, 184, 166, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
              <Text ta="center" size="lg" fw={700} c={buyIsBetter ? 'teal' : 'orange'} mb="xs">
                {buyIsBetter ? 'Buying is Better' : 'Renting is Better'}
              </Text>
              <Text ta="center" size="sm" c="dimmed" mb="md">
                Over {loanTerm} years, {buyIsBetter ? 'buying' : 'renting + investing'} saves you <strong style={{ color: 'white' }}>${format(netDifference)}</strong> compared to {buyIsBetter ? 'renting' : 'buying'}.
              </Text>
              <Group justify="center" gap="xl">
                <Box ta="center">
                  <Text size="xs" c="dimmed">Buying Net Cost</Text>
                  <Text fw={600} c={buyIsBetter ? 'teal' : 'dimmed'} size="lg">${format(totalCostBuying)}</Text>
                </Box>
                <Box ta="center">
                  <Text size="xs" c="dimmed">Renting + Investing</Text>
                  <Text fw={600} c={buyIsBetter ? 'dimmed' : 'orange'} size="lg">${format(totalCostRenting)}</Text>
                </Box>
              </Group>
            </Card>

            <Center mt="sm">
              <Box ta="center">
                <Text size="sm" c="dimmed" mb={4}>Buying Monthly Cost</Text>
                <Text fw={700} fz={32} c="white">${format(totalMonthlyBuying)}</Text>
                <Text size="xs" c="dimmed">
                  vs. ${format(monthlyRent)} rent{totalMonthlyBuying > monthlyRent ? ` (${((totalMonthlyBuying / monthlyRent - 1) * 100).toFixed(0)}% more)` : ` (${((1 - totalMonthlyBuying / monthlyRent) * 100).toFixed(0)}% less)`}
                </Text>
              </Box>
            </Center>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
