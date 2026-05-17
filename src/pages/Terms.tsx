import { Box, Title, Text } from '@mantine/core';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <Box mt={20} mb="xl" style={{ backgroundColor: 'transparent', padding: '2rem 1rem' }}>
      <SEO 
        title="Terms of Service | MyLoanMaster"
        description="Read the Terms of Service for MyLoanMaster. Understand the conditions of use for our free financial calculators."
        canonicalUrl="https://www.myloanmaster.com/terms"
      />
      <Title order={1} c="white" mb="sm">Terms of Service</Title>
      <Text size="sm" c="dimmed" mb="md" lh={1.6}>
        By using MyLoanMaster ("the Tool"), you agree to these terms. The Tool is provided "as is" and "as available". While we strive for mathematical accuracy, we make no warranties regarding the absolute correctness of the calculations provided. You agree not to hold the creators liable for any errors, omissions, or damages arising from the use of this free utility. You may use the Tool for personal, educational, and commercial needs.
      </Text>
      <Text size="sm" c="dimmed" mb="md" lh={1.6}>
        The calculators on this site are for informational and educational purposes only and do not constitute financial or legal advice. Always consult with a licensed professional before making any significant financial decisions.
      </Text>
    </Box>
  );
}
