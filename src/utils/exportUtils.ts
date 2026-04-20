import html2canvas from 'html2canvas';

export async function takeScreenshot(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#11131A', // Base dark mode background to prevent transparent bugs
      scale: 2 // High resolution
    });

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Screenshot failed', err);
  }
}
