import { Box, Title, Text, Anchor } from '@mantine/core';
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <Box mt={20} mb="xl" style={{ backgroundColor: 'transparent', padding: '2rem 1rem' }}>
      <SEO 
        title="Privacy Policy | MyLoanMaster"
        description="Review the Privacy Policy for MyLoanMaster. Learn how we keep your financial calculations completely private and local to your device."
        canonicalUrl="https://www.myloanmaster.com/privacy"
      />
      <Title order={1} c="white" mb="sm">Privacy Policy</Title>
      <Text size="sm" c="dimmed" mb="xl" lh={1.6}>
        Your privacy is completely respected. MyLoanMaster processes all calculations locally within your browser using JavaScript; no personal financial data is transmitted to or stored on our servers. When you close the tab, your input data is cleared.
      </Text>
      <Text size="sm" c="dimmed" mb="xl" lh={1.6}>
        <strong>Third-Party Vendors:</strong> We may use Google AdSense to display advertisements. Google uses cookies to serve ads based on a user's prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google's <Anchor href="https://www.google.com/settings/ads" target="_blank" c="cyan">Ads Settings</Anchor>.
      </Text>
      <Text size="sm" c="dimmed" mb="xl" lh={1.6}>
        We do not collect analytics on the specific numbers you enter into the calculators. Your financial privacy is our highest priority.
      </Text>
    </Box>
  );
}
