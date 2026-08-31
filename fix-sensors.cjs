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

    // Remove dangling useSensor code
    content = content.replace(/,\n\s*useSensor\(TouchSensor, \{\}\),\n\s*useSensor\(KeyboardSensor, \{\}\)\n\s*\)/g, '');

    fs.writeFileSync(file, content);
}
console.log('Done cleaning up sensors');
