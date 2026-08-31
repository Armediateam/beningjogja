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

    // Remove the incorrect curly braces around flexRender in the header ternary
    content = content.replace(/\{\s*flexRender\(header\.column\.columnDef\.header,\s*header\.getContext\(\)\)\s*\}/g, 'flexRender(header.column.columnDef.header, header.getContext())');

    fs.writeFileSync(file, content);
}
console.log('Done fixing flexRender in headers');
