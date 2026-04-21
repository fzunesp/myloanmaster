import { useState, useMemo } from 'react';
import { Card, Title, Text, Slider, Group, Stack, Box, ActionIcon, Flex, Button, TextInput, NumberInput, SegmentedControl, Table, ScrollArea } from '@mantine/core';
import { calculateDebtPayoffTimeline, type DebtItem } from '../utils/financialMath';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera, Plus, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DebtStrategist() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Credit Card A', balance: 5000, interestRate: 22.9, minimumPayment: 150 },
    { id: '2', name: 'Car Loan', balance: 15000, interestRate: 7.5, minimumPayment: 300 },
  ]);
  const [extraPayment, setExtraPayment] = useState(250);
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');

  const { timeline, monthsToFreedom } = useMemo(() => {
    if (debts.length > 0) {
      const data = calculateDebtPayoffTimeline(debts, extraPayment, strategy);
      return { timeline: data, monthsToFreedom: data.length - 1 };
    }
    return { timeline: [], monthsToFreedom: 0 };
  }, [debts, extraPayment, strategy]);

  const addDebt = () => {
    setDebts([...debts, { id: Math.random().toString(), name: 'New Debt', balance: 1000, interestRate: 15, minimumPayment: 50 }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof DebtItem, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const totalDebt = debts.reduce((acc, d) => acc + d.balance, 0);

  return (
    <Stack gap="xl">
      <Card id="debt-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={3} c="white">Debt Payoff Strategist</Title>
          <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('debt-card', 'debt-results')} title="Take Screenshot">
            <Camera size={20} />
          </ActionIcon>
        </Flex>

        <Stack gap="xl">
          <Box p="md" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
            <Group justify="space-between" align="flex-end">
              <Box style={{ flex: 1 }}>
                <Text size="sm" c="dimmed" mb={4}>Extra Monthly Budget</Text>
                <Slider value={extraPayment} onChange={setExtraPayment} min={0} max={2000} step={50} color="green" size="lg" />
                <Text mt="xs" fw={700} c="green">+ ${extraPayment} / month</Text>
              </Box>
              
              <Box style={{ width: 250 }}>
                <Text size="sm" c="dimmed" mb={4}>Strategy</Text>
                <SegmentedControl
                  value={strategy}
                  onChange={(val) => setStrategy(val as 'snowball' | 'avalanche')}
                  data={[
                    { label: 'Snowball (Smallest First)', value: 'snowball' },
                    { label: 'Avalanche (Highest Rate)', value: 'avalanche' }
                  ]}
                  fullWidth
                  color="cyan"
                />
              </Box>
            </Group>
          </Box>

          <Box>
            <Flex justify="space-between" align="center" mb="md">
              <Text size="lg" fw={500} c="white">Your Debts</Text>
              <Button leftSection={<Plus size={16} />} variant="light" onClick={addDebt} size="sm">Add Debt</Button>
            </Flex>
            
            <ScrollArea>
              <Table verticalSpacing="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Balance ($)</th>
                    <th>Interest Rate (%)</th>
                    <th>Min Payment ($)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {debts.map((debt) => (
                    <tr key={debt.id} style={{ borderBottom: '1px solid #2C2E33' }}>
                      <td>
                        <TextInput value={debt.name} onChange={(e) => updateDebt(debt.id, 'name', e.currentTarget.value)} variant="filled" />
                      </td>
                      <td>
                        <NumberInput value={debt.balance} onChange={(val) => updateDebt(debt.id, 'balance', Number(val) || 0)} min={0} variant="filled" />
                      </td>
                      <td>
                        <NumberInput value={debt.interestRate} onChange={(val) => updateDebt(debt.id, 'interestRate', Number(val) || 0)} min={0} max={100} variant="filled" />
                      </td>
                      <td>
                        <NumberInput value={debt.minimumPayment} onChange={(val) => updateDebt(debt.id, 'minimumPayment', Number(val) || 0)} min={0} variant="filled" />
                      </td>
                      <td>
                        <ActionIcon color="red" variant="subtle" onClick={() => removeDebt(debt.id)}>
                          <Trash2 size={16} />
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
                  {debts.length === 0 && (
                    <tr><td colSpan={5}><Text ta="center" c="dimmed">No debts added.</Text></td></tr>
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          </Box>

          {debts.length > 0 && (
             <Group grow mt="md">
                <Box p="md" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                   <Text size="sm" c="dimmed">Total Starting Debt</Text>
                   <Text size="xl" fw={700} c="white">${totalDebt.toLocaleString()}</Text>
                </Box>
                <Box p="md" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                   <Text size="sm" c="dimmed">Target Debt-Free Date</Text>
                   <Text size="xl" fw={700} c="cyan">
                     In {Math.floor(monthsToFreedom / 12)} Yrs, {monthsToFreedom % 12} Mos
                   </Text>
                </Box>
             </Group>
          )}

        </Stack>
      </Card>

      {timeline.length > 0 && (
        <Card shadow="sm" p="lg" radius="md" withBorder mt="xl">
          <Title order={3} mb="md">Payoff Timeline</Title>
          <Box h={400}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 10, right: 30, left: 60, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" type="number" domain={[0, 'dataMax']} tick={{fill: '#888'}} label={{ value: 'Time (Months)', position: 'insideBottom', offset: -10, fill: '#888' }} />
                <YAxis 
                  tickFormatter={(value) => value >= 1000000 ? `$${(value/1000000).toFixed(1)}M` : value >= 1000 ? `$${value/1000}k` : `$${value}`}
                  tick={{fill: '#888'}} 
                  label={{ value: 'Remaining Bal ($)', angle: -90, position: 'insideLeft', dx: -45, fill: '#888', style: { textAnchor: 'middle' } }} 
                />
                <Tooltip contentStyle={{ backgroundColor: '#1A1B1E', borderColor: '#2C2E33' }} itemStyle={{ color: '#C1C2C5' }} />
                <Area type="monotone" dataKey="totalRemainingBalance" stroke="#fa5252" fill="rgba(250, 82, 82, 0.2)" name="Total Debt" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      )}
    </Stack>
  );
}
