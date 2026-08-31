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

    // Remove the extra curly braces I injected by mistake in table mapping
    content = content.replace(/\{\s*table\.getRowModel\(\)\.rows\.map/g, 'table.getRowModel().rows.map');
    
    // Also remove the trailing curly brace I added at the end of the map
    // The previous replacement was `))}` which should be `))`
    content = content.replace(/\)\)\}\n\s*\) : \(/g, '))\n                ) : (');

    fs.writeFileSync(file, content);
}
console.log('Done fixing map braces');
