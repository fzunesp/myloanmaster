import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Title, Text, Box } from '@mantine/core';
import type { AmortizationRow } from '../utils/financialMath';

interface Props {
  data: AmortizationRow[];
}

export default function AmortizationChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card shadow="sm" p="lg" radius="md" withBorder mt="xl">
        <Text>No schedule to display.</Text>
      </Card>
    );
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder mt="xl">
      <Title order={3} mb="md">Amortization Schedule</Title>
      
      <Box h={400}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 60,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="month" 
              type="number" 
              domain={[0, 'dataMax']} 
              tick={{fill: '#888'}} 
              label={{ value: 'Time (Months)', position: 'insideBottom', offset: -10, fill: '#888' }} 
            />
            <YAxis 
              tickFormatter={(value) => value >= 1000000 ? `$${(value/1000000).toFixed(1)}M` : value >= 1000 ? `$${value/1000}k` : `$${value}`}
              tick={{fill: '#888'}} 
              label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft', dx: -45, fill: '#888', style: { textAnchor: 'middle' } }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1B1E', borderColor: '#2C2E33' }}
              itemStyle={{ color: '#C1C2C5' }}
            />
            <Area type="monotone" dataKey="balance" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Remaining Balance" />
            <Area type="monotone" dataKey="principalPayment" stackId="2" stroke="#8884d8" fill="#8884d8" name="Principal Paid" />
            <Area type="monotone" dataKey="interestPayment" stackId="2" stroke="#ffc658" fill="#ffc658" name="Interest Paid" />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
