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

    // Remove the selected rows counter in the footer
    const regex = /\s*<div className="hidden flex-1 text-sm text-muted-foreground lg:flex">\s*\{table\.getFilteredSelectedRowModel\(\)\.rows\.length\} of\{" "\}\s*\{table\.getFilteredRowModel\(\)\.rows\.length\} row\(s\) selected\.\s*<\/div>/g;
    
    content = content.replace(regex, '');

    fs.writeFileSync(file, content);
}
console.log('Done removing row selection text');
