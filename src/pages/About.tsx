import { Box, Title, Text, Divider, Accordion } from '@mantine/core';
import SEO from '../components/SEO';

export default function About() {
  return (
    <Box mt={20} mb="xl" style={{ backgroundColor: 'transparent', padding: '2rem 1rem' }}>
      <SEO 
        title="About MyLoanMaster | Free Financial Calculators"
        description="Learn more about MyLoanMaster, a premium suite of free, mathematically precise, and private financial calculators running locally in your browser."
        canonicalUrl="https://www.myloanmaster.com/about"
      />
      <Title order={1} c="white" mb="sm">About MyLoanMaster</Title>
      <Text size="sm" c="dimmed" mb="md" lh={1.6}>
        MyLoanMaster is a premium, lightning-fast financial utility designed for professionals, students, and everyday use. Featuring 9 powerful tools — including Mortgage, Refinance, Affordability, Rent vs. Buy, Auto Loan, Investment, Debt Strategist, Quick Percentage, and Retirement Planning — MyLoanMaster provides exact, mathematically precise financial projections in real-time. Every calculation runs locally in your browser for maximum privacy and performance.
      </Text>
      <Text size="sm" c="dimmed" mb="md" lh={1.6}>
        Whether you're calculating monthly mortgage payments, evaluating whether to refinance, planning how much house you can afford, comparing renting vs. buying, estimating auto loan costs, visualizing investment growth, strategizing debt payoff, quickly computing percentages, or projecting your retirement savings — MyLoanMaster has you covered. All tools are free, require no signup, and process your data locally for complete privacy.
      </Text>

      <Divider my="xl" color="dark.4" />

      <Title order={2} c="white" mb="lg">Frequently Asked Questions</Title>
      <Accordion variant="separated" mb="xl" styles={{ label: { color: '#e2e8f0', fontWeight: 500 }, content: { color: '#94a3b8', lineHeight: 1.6 } }}>
        <Accordion.Item value="free">
          <Accordion.Control>Is MyLoanMaster free to use?</Accordion.Control>
          <Accordion.Panel>
            Yes. MyLoanMaster is 100% free with no hidden fees or premium tiers. All calculations run locally in your browser using JavaScript — no data is sent to any server. We're supported by non-intrusive advertising.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="privacy">
          <Accordion.Control>Is my financial data private?</Accordion.Control>
          <Accordion.Panel>
            Absolutely. All calculations happen entirely in your browser. No personal or financial data is stored, transmitted, or shared with any third party. When you close the page, your data is gone.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="mobile">
          <Accordion.Control>Can I use MyLoanMaster on my phone?</Accordion.Control>
          <Accordion.Panel>
            Yes. MyLoanMaster is fully responsive and works on all devices — desktop, tablet, and mobile. All tools adapt to your screen size for a seamless experience. Bookmark it on your phone for quick access anytime.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="accuracy">
          <Accordion.Control>How accurate are the calculations?</Accordion.Control>
          <Accordion.Panel>
            MyLoanMaster uses standard financial formulas for all calculations. While we strive for mathematical precision, results should be used for estimation and planning purposes. For exact figures, especially for legal or contractual purposes, consult a licensed financial professional.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
