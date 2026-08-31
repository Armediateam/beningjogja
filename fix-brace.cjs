const fs = require('fs');

const files = [
    'resources/js/components/booking-table.tsx',
    'resources/js/components/customer-table.tsx',
    'resources/js/components/pricing-table.tsx',
    'resources/js/components/user-table.tsx'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(/\s*\}\n\n\s*return \(/g, '\n\n  return (');

    fs.writeFileSync(file, content);
}
console.log('Done cleaning up dangling brace');
