import { useState } from 'react';
import { Card, NumberInput, Text, Group, Stack, Title, Box, Badge, ActionIcon, Flex } from '@mantine/core';
import { PercentageMath } from '../utils/financialMath';
import { takeScreenshot } from '../utils/exportUtils';
import { Camera } from 'lucide-react';

export default function PercentageCalculator() {
  const [val1, setVal1] = useState<number | string>(20);
  const [val2, setVal2] = useState<number | string>(150);

  const [val3, setVal3] = useState<number | string>(45);
  const [val4, setVal4] = useState<number | string>(50);

  const [val5, setVal5] = useState<number | string>(50);
  const [val6, setVal6] = useState<number | string>(60);

  return (
    <Card id="percentage-card" shadow="sm" p="xl" radius="lg" style={{ backgroundColor: '#11131A', border: '1px solid #1f2330' }}>
      <Flex justify="space-between" align="center" mb="xl">
        <Title order={3} c="white">Simplified Percentage Math</Title>
        <ActionIcon variant="light" color="cyan" size="lg" onClick={() => takeScreenshot('percentage-card', 'percentage-results')} title="Take Screenshot">
          <Camera size={20} />
        </ActionIcon>
      </Flex>

      <Stack gap="xl">
        {/* Scenario 1: Tipping or Tax */}
        <Box p="md" style={{ borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <Badge color="cyan" mb="xs">Find a Cut (like Tip or Tax)</Badge>
          <Group align="flex-end" gap="sm">
            <Text c="white">I want to find</Text>
            <NumberInput value={val1} onChange={setVal1} w={80} size="md" rightSection={<Text size="sm" c="dimmed" mr="sm">%</Text>} />
            <Text c="white">of</Text>
            <NumberInput value={val2} onChange={setVal2} w={120} size="md" leftSection={<Text size="sm" c="dimmed" ml="sm">$</Text>} />
            <Text fw={700} c="cyan" size="xl" ml="md">
              = {PercentageMath.percentOf(Number(val1) || 0, Number(val2) || 0).toFixed(2)}
            </Text>
          </Group>
        </Box>

        {/* Scenario 2: Test Scores */}
        <Box p="md" style={{ borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <Badge color="violet" mb="xs">Find the Score (like a Test Grade)</Badge>
          <Group align="flex-end" gap="sm">
            <Text c="white">I got</Text>
            <NumberInput value={val3} onChange={setVal3} w={120} size="md" />
            <Text c="white">out of</Text>
            <NumberInput value={val4} onChange={setVal4} w={120} size="md" />
            <Text fw={700} c="violet" size="xl" ml="md">
              = {PercentageMath.isWhatPercentOf(Number(val3) || 0, Number(val4) || 0).toFixed(1)}%
            </Text>
          </Group>
        </Box>

        {/* Scenario 3: Price Changes */}
        <Box p="md" style={{ borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.03)' }}>
          <Badge color="orange" mb="xs">Find the Change (Did it go up or down?)</Badge>
          <Group align="flex-end" gap="sm">
            <Text c="white">The value went from</Text>
            <NumberInput value={val5} onChange={setVal5} w={120} size="md" />
            <Text c="white">to</Text>
            <NumberInput value={val6} onChange={setVal6} w={120} size="md" />
            
            <Text fw={700} c={Number(val6) > Number(val5) ? "green" : "red"} size="xl" ml="md">
              {Number(val6) === Number(val5) ? "= No Change (0%)" : 
               Number(val6) > Number(val5) ? 
               `= It went UP by ${PercentageMath.percentageChange(Number(val5) || 0, Number(val6) || 0).toFixed(1)}% 📈` : 
               `= It went DOWN by ${Math.abs(PercentageMath.percentageChange(Number(val5) || 0, Number(val6) || 0)).toFixed(1)}% 📉`
              }
            </Text>
          </Group>
        </Box>
      </Stack>
    </Card>
  );
}
