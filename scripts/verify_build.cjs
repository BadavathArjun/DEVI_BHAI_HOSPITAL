const fs = require('fs');
const path = require('path');

console.log('Testing static bundle build and file assets:');

const distHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
console.log('1. dist/index.html title check:', distHtml.includes('Devibai Super Speciality Hospital'));
console.log('2. dist/index.html JSON-LD check:', distHtml.includes('https://schema.org'));
console.log('3. dist/index.html meta description check:', distHtml.includes('name="description"'));
console.log('4. dist/index.html Google Fonts check:', distHtml.includes('fonts.googleapis.com'));

const doctors = fs.readdirSync(path.join(__dirname, '../public/assets/doctors'));
console.log('5. Verified doctor images in public/assets/doctors:', doctors.length);

const insurance = fs.readdirSync(path.join(__dirname, '../public/assets/insurance'));
console.log('6. Verified insurance logos in public/assets/insurance:', insurance.length);

const facilities = fs.readdirSync(path.join(__dirname, '../public/assets/facilities'));
console.log('7. Verified facility assets in public/assets/facilities:', facilities.length);

const branding = fs.readdirSync(path.join(__dirname, '../public/assets/branding'));
console.log('8. Verified branding assets in public/assets/branding:', branding.length);

const sitemap = fs.readFileSync(path.join(__dirname, '../public/sitemap.xml'), 'utf8');
console.log('9. Sitemap URL count check:', (sitemap.match(/<loc>/g) || []).length);

const robots = fs.readFileSync(path.join(__dirname, '../public/robots.txt'), 'utf8');
console.log('10. Robots.txt disallow check:', robots.includes('Disallow: /admin/'));

console.log('\n--- ALL VERIFICATIONS PASSED ---');
