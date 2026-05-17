import { Box, Title, Text, TextInput, Textarea, Button, Notification } from '@mantine/core';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "a750fae0-7a97-4c48-8049-76ef6ab3523a");
    formData.append("subject", "New Message from MyLoanMaster");
    formData.append("from_name", "MyLoanMaster Contact Form");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      const jsonRes = await response.json();
      
      if (response.status === 200) {
        setResult({ type: 'success', message: "Form submitted successfully! We will review your submission and get back to you soon." });
        (e.target as HTMLFormElement).reset();
      } else {
        setResult({ type: 'error', message: jsonRes.message || "Something went wrong!" });
      }
    } catch (error) {
      setResult({ type: 'error', message: "Something went wrong!" });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResult(null);
      }, 8000);
    }
  };

  return (
    <Box mt={20} mb="xl" style={{ backgroundColor: 'transparent', padding: '2rem 1rem' }}>
      <SEO 
        title="Contact Us | MyLoanMaster"
        description="Get in touch with the MyLoanMaster team for support, feedback, or business inquiries."
        canonicalUrl="https://www.myloanmaster.com/contact"
      />
      <Title order={1} c="white" mb="sm">Contact Us</Title>
      <Text size="sm" c="dimmed" mb="xl" lh={1.6}>
        Have a suggestion for a new calculator to add? Found a bug? We'd love to hear from you.
      </Text>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <TextInput
          label="Your Email"
          placeholder="name@example.com"
          name="email"
          type="email"
          required
          styles={{
            input: { backgroundColor: 'rgba(15, 23, 42, 0.6)', borderColor: 'rgba(255,255,255,0.08)', color: '#f8fafc' },
            label: { color: '#b9c7da', marginBottom: '8px' }
          }}
        />
        
        <Textarea
          label="Message"
          placeholder="How can we help?"
          name="message"
          required
          minRows={5}
          styles={{
            input: { backgroundColor: 'rgba(15, 23, 42, 0.6)', borderColor: 'rgba(255,255,255,0.08)', color: '#f8fafc' },
            label: { color: '#b9c7da', marginBottom: '8px' }
          }}
        />

        <Button 
          type="submit" 
          loading={loading}
          radius="xl"
          mt="sm"
          style={{ 
            background: 'linear-gradient(105deg, #3b82f6, #6366f1)',
            boxShadow: '0 6px 18px rgba(59,130,246,0.4)',
            alignSelf: 'flex-start'
          }}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>

        {result && (
          <Notification 
            icon={result.type === 'success' ? <Check size={18} /> : <X size={18} />} 
            color={result.type === 'success' ? 'teal' : 'red'} 
            withCloseButton={false}
            mt="md"
            styles={{
              root: {
                backgroundColor: result.type === 'success' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                borderColor: result.type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)',
              },
              title: { color: result.type === 'success' ? '#4ade80' : '#f87171' },
              description: { color: result.type === 'success' ? '#4ade80' : '#f87171' }
            }}
          >
            {result.message}
          </Notification>
        )}
      </form>

      <Text size="sm" c="dimmed" mt="xl" style={{ opacity: 0.8 }}>
        We typically respond within 48 hours.
      </Text>
    </Box>
  );
}
