import fs from 'fs';
import path from 'path';

const DIST_DIR = path.join(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');
const BASE_URL = 'https://www.myloanmaster.com';

const routes = [
  { path: '/', title: 'MyLoanMaster – Free Mortgage, Auto Loan, Refinance & Financial Calculators', desc: 'Free online financial calculators. Fast, private, and mathematically precise.', priority: 1.0 },
  { path: '/mortgage', title: 'Mortgage Calculator | Free Monthly Payment Estimator', desc: 'Calculate your monthly mortgage payments instantly. View amortization schedules and principal vs interest breakdowns for free.', priority: 0.9 },
  { path: '/refinance', title: 'Refinance Calculator | See How Much You Can Save', desc: 'Compare your current mortgage with a new loan to see your break-even point and lifetime savings if you refinance.', priority: 0.9 },
  { path: '/affordability', title: 'Home Affordability Calculator | How Much House Can I Afford?', desc: 'Enter your income and debts to find out exactly how much house you can afford based on standard lending guidelines.', priority: 0.9 },
  { path: '/rentbuy', title: 'Rent vs Buy Calculator | Which is Better for You?', desc: 'Compare the long-term costs of renting versus buying a home, including maintenance, taxes, and appreciation.', priority: 0.9 },
  { path: '/autoloan', title: 'Auto Loan Calculator | Car Payment Estimator', desc: 'Calculate your monthly car payment, total interest, and total cost including tax and trade-in value.', priority: 0.9 },
  { path: '/investment', title: 'Investment Visualizer | Compound Interest Calculator', desc: 'See how your money grows over time with the power of compound interest. Interactive charts and projections.', priority: 0.9 },
  { path: '/debt', title: 'Debt Payoff Calculator | Avalanche vs Snowball Method', desc: 'Plan your debt payoff strategy. Compare the avalanche and snowball methods to save money on interest.', priority: 0.9 },
  { path: '/percentage', title: 'Quick Percentage Calculator | Easy Math Tool', desc: 'Quickly calculate percentages, percentage changes, and differences with our free, instant calculator.', priority: 0.9 },
  { path: '/retirement', title: 'Retirement Calculator | Plan Your Financial Future', desc: 'Find out if you are on track for retirement. Project your savings and see how long your money will last.', priority: 0.9 },
  { path: '/about', title: 'About MyLoanMaster | Free Financial Calculators', desc: 'Learn more about MyLoanMaster, a premium suite of free, mathematically precise, and private financial calculators running locally in your browser.', priority: 0.8 },
  { path: '/terms', title: 'Terms of Service | MyLoanMaster', desc: 'Read the Terms of Service for MyLoanMaster. Understand the conditions of use for our free financial calculators.', priority: 0.8 },
  { path: '/privacy', title: 'Privacy Policy | MyLoanMaster', desc: 'Review the Privacy Policy for MyLoanMaster. Learn how we keep your financial calculations completely private and local to your device.', priority: 0.8 },
  { path: '/contact', title: 'Contact Us | MyLoanMaster', desc: 'Get in touch with the MyLoanMaster team for support, feedback, or business inquiries.', priority: 0.8 }
];

function generatePages() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    console.error("index.html not found in dist/. Please run 'npm run build' first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

  // Generate a physical HTML file for each route
  routes.forEach(route => {
    let html = baseHtml;
    
    // Replace Meta Tags
    html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${route.desc}">`);
    html = html.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${BASE_URL}${route.path}">`);

    // If it's a sub-route, create a directory and put index.html inside it
    if (route.path !== '/') {
      const routeDir = path.join(DIST_DIR, route.path.substring(1));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, 'index.html'), html);
      console.log(`Created ${route.path}/index.html`);
    } else {
      // Overwrite the root index.html with the optimized one
      fs.writeFileSync(INDEX_HTML_PATH, html);
      console.log(`Updated /index.html`);
    }
  });
}

function generateSitemap() {
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const today = new Date().toISOString().split('T')[0];

  routes.forEach(route => {
    const url = route.path === '/' ? BASE_URL : `${BASE_URL}${route.path}`;
    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${url}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    sitemapXml += `  </url>\n`;
  });

  sitemapXml += `</urlset>`;

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml);
  console.log(`Generated sitemap.xml with ${routes.length} URLs`);
}

generatePages();
generateSitemap();
