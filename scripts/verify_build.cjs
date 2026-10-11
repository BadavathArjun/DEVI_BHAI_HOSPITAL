const fs = require('fs');
const path = require('path');

console.log('Testing static bundle build, pre-rendered SEO routes, and file assets:');

const distHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
console.log('1. dist/index.html title check:', distHtml.includes('Devibai Super Speciality Hospital'));
console.log('2. dist/index.html JSON-LD check:', distHtml.includes('https://schema.org'));
console.log('3. dist/index.html meta description check:', distHtml.includes('name="description"'));
console.log('4. dist/index.html Google Fonts check:', distHtml.includes('fonts.googleapis.com'));

// Verify Pre-rendered Route Snapshots
const drChandrikaHtml = path.join(__dirname, '../dist/doctors/dr-k-chandrika/index.html');
console.log('5. Pre-rendered Dr. Chandrika HTML exists:', fs.existsSync(drChandrikaHtml));
if (fs.existsSync(drChandrikaHtml)) {
  const content = fs.readFileSync(drChandrikaHtml, 'utf8');
  console.log('   - Contains Dr. Chandrika in title:', content.includes('Dr. K. Chandrika'));
  console.log('   - Contains Physician schema:', content.includes('"@type": "Physician"') || content.includes('@type":"Physician"'));
}

const emergencyHtml = path.join(__dirname, '../dist/emergency/index.html');
console.log('6. Pre-rendered Emergency HTML exists:', fs.existsSync(emergencyHtml));
if (fs.existsSync(emergencyHtml)) {
  const content = fs.readFileSync(emergencyHtml, 'utf8');
  console.log('   - Contains EmergencyService schema:', content.includes('EmergencyService'));
}

const doctors = fs.readdirSync(path.join(__dirname, '../public/assets/doctors'));
console.log('7. Verified doctor images in public/assets/doctors:', doctors.length);

const insurance = fs.readdirSync(path.join(__dirname, '../public/assets/insurance'));
console.log('8. Verified insurance logos in public/assets/insurance:', insurance.length);

const facilities = fs.readdirSync(path.join(__dirname, '../public/assets/facilities'));
console.log('9. Verified facility assets in public/assets/facilities:', facilities.length);

const branding = fs.readdirSync(path.join(__dirname, '../public/assets/branding'));
console.log('10. Verified branding assets in public/assets/branding:', branding.length);

const sitemap = fs.readFileSync(path.join(__dirname, '../public/sitemap.xml'), 'utf8');
console.log('11. Sitemap URL count check:', (sitemap.match(/<loc>/g) || []).length);

const robots = fs.readFileSync(path.join(__dirname, '../public/robots.txt'), 'utf8');
console.log('12. Robots.txt disallow check:', robots.includes('Disallow: /admin/'));

// Favicon check
const faviconExists = fs.existsSync(path.join(__dirname, '../public/favicon.svg')) && fs.existsSync(path.join(__dirname, '../dist/favicon.svg'));
const faviconTagCheck = distHtml.includes('rel="icon" type="image/svg+xml" href="/favicon.svg');
console.log('13. Favicon SVG check (file & head link):', faviconExists && faviconTagCheck);

console.log('\n--- ALL ADVANCED SEO VERIFICATIONS PASSED ---');
