import { useState, useEffect } from 'react';
import { Card, Title, Text, Slider, Group, Stack, Box, ActionIcon, Flex } from '@mantine/core';
import { calculateCompoundInterest } from '../utils/financialMath';
import type { InvestmentRow } from '../utils/financialMath';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InvestmentVisualizer() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(25);

  const [schedule, setSchedule] = useState<InvestmentRow[]>([]);
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const data = calculateCompoundInterest(initial, monthly, rate, years);
    setSchedule(data);
    const last = data[data.length - 1];
    if(last) {
      setFinalBalance(last.balance);
      setTotalContributions(last.totalContributions);
      setTotalInterest(last.totalInterest);
    }
  }, [initial, monthly, rate, years]);

  return (
    <Stack gap="xl">
      <Card id="investment-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={3} c="white">Compound Interest Visualizer</Title>
          <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('investment-card', 'investment-results')} title="Take Screenshot">
            <Camera size={20} />
          </ActionIcon>
        </Flex>

        <Stack gap="xl">
          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="lg" fw={500} c="white">Initial Investment</Text>
              <Text size="lg" fw={600} c="white">${initial.toLocaleString()}</Text>
            </Group>
            <Slider value={initial} onChange={setInitial} min={0} max={1000000} step={5000} color="green" size="xl" thumbSize={24} />
          </Box>

          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="lg" fw={500} c="white">Monthly Contribution</Text>
              <Text size="lg" fw={600} c="white">${monthly.toLocaleString()}</Text>
            </Group>
            <Slider value={monthly} onChange={setMonthly} min={0} max={10000} step={100} color="cyan" size="xl" thumbSize={24} />
          </Box>

          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="lg" fw={500} c="white">Expected Annual Return</Text>
              <Text size="lg" fw={600} c="white">{rate.toFixed(1)}%</Text>
            </Group>
             <Slider value={rate} onChange={setRate} min={0} max={20} step={0.5} color="pink" size="xl" thumbSize={24} />
          </Box>

          <Box>
            <Group justify="space-between" mb="xs">
              <Text size="lg" fw={500} c="white">Years to Grow</Text>
              <Text size="lg" fw={600} c="white">{years} Years</Text>
            </Group>
            <Slider value={years} onChange={setYears} min={1} max={50} step={1} color="orange" size="xl" thumbSize={24} />
          </Box>

          <Group grow mt="md">
             <Box p="md" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <Text size="sm" c="dimmed">Final Balance</Text>
                <Text size="xl" fw={700} c="green">${finalBalance.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</Text>
             </Box>
             <Box p="md" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <Text size="sm" c="dimmed">Your Contributions</Text>
                <Text size="xl" fw={700} c="cyan">${totalContributions.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</Text>
             </Box>
             <Box p="md" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <Text size="sm" c="dimmed">Total Interest Gained</Text>
                <Text size="xl" fw={700} c="pink">${totalInterest.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,')}</Text>
             </Box>
          </Group>
        </Stack>
      </Card>

      <Card shadow="sm" p="lg" radius="md" withBorder mt="xl">
        <Title order={3} mb="md">Growth Over Time</Title>
        <Box h={400}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={schedule} margin={{ top: 10, right: 30, left: 60, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" type="number" domain={[0, 'dataMax']} tick={{fill: '#888'}} label={{ value: 'Time (Years)', position: 'insideBottom', offset: -10, fill: '#888' }} />
              <YAxis 
                tickFormatter={(value) => value >= 1000000 ? `$${(value/1000000).toFixed(1)}M` : value >= 1000 ? `$${value/1000}k` : `$${value}`}
                tick={{fill: '#888'}} 
                label={{ value: 'Portfolio Value ($)', angle: -90, position: 'insideLeft', dx: -45, fill: '#888', style: { textAnchor: 'middle' } }} 
              />
              <Tooltip contentStyle={{ backgroundColor: '#1A1B1E', borderColor: '#2C2E33' }} itemStyle={{ color: '#C1C2C5' }} />
              <Area type="monotone" dataKey="totalInterest" stackId="1" stroke="#e64980" fill="#e64980" name="Interest Earned" />
              <Area type="monotone" dataKey="totalContributions" stackId="1" stroke="#15aabf" fill="#15aabf" name="Your Money" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Stack>
  );
}
