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

    // Replace FlexRender import with flexRender
    content = content.replace(/FlexRender,/, 'flexRender,');

    // Remove dnd imports
    content = content.replace(/import\s*\{\s*closestCenter[\s\S]*?from\s*"@dnd-kit\/utilities"\n/g, '');

    // Remove IconGripVertical
    content = content.replace(/\s*IconGripVertical,/, '');

    // Remove Checkbox import
    content = content.replace(/import\s*\{\s*Checkbox\s*\}\s*from\s*"@\/components\/ui\/checkbox"\n/, '');

    // Remove rowSelectionFeature from import
    content = content.replace(/\s*rowSelectionFeature,/, '');
    content = content.replace(/\s*rowSelectionFeature,/, '');

    // Remove DragHandle component
    content = content.replace(/function DragHandle\(\{\s*id\s*\}\s*:\s*\{\s*id:\s*number\s*\}\)\s*\{[\s\S]*?return\s*\([\s\S]*?<\/Button>\n\s*\)\n\}\n/g, '');

    // Remove drag column
    content = content.replace(/ {2}columnHelper\.display\(\{\n {4}id: "drag",\n {4}header: \(\) => null,\n {4}cell: \(\{ row \}\) => <DragHandle id=\{row\.original\.id\} \/>,\n {2}\}\),\n/g, '');

    // Remove select column
    content = content.replace(/ {2}columnHelper\.display\(\{\n {4}id: "select",[\s\S]*?enableHiding: false,\n {2}\}\),\n/g, '');

    // Remove DraggableRow component
    content = content.replace(/function DraggableRow\(\{[\s\S]*?\}\) \{\n\s*const \{ transform[\s\S]*?return \(\n[\s\S]*?<\/TableRow>\n\s*\)\n\}\n/g, '');

    // Remove rowSelection from state
    content = content.replace(/\s*const \[rowSelection, setRowSelection\] = React\.useState\(\{\}\)/g, '');
    content = content.replace(/\s*const sortableId = React\.useId\(\)\n\s*const sensors = useSensors\([\s\S]*?\}\)/g, '');
    content = content.replace(/\s*const dataIds = React\.useMemo<UniqueIdentifier\[\]>\(\n[\s\S]*?\[data\]\n\s*\)/g, '');
    content = content.replace(/ {2}function handleDragEnd\(event: DragEndEvent\) \{[\s\S]*?\}\n/g, '');

    // Clean useTable options
    content = content.replace(/\s*rowSelection,/, '');
    content = content.replace(/\s*enableRowSelection:\s*true,/, '');
    content = content.replace(/\s*onRowSelectionChange:\s*setRowSelection,/, '');

    // Replace DndContext and TableBody
    content = content.replace(/<DndContext[\s\S]*?<Table>/g, '<Table>');
    content = content.replace(/<\/Table>\s*<\/DndContext>/g, '</Table>');

    const sortableRegex = /<SortableContext[\s\S]*?>\n\s*\{table\.getRowModel\(\)\.rows\.map\(\(row\) => \(\n\s*<DraggableRow key=\{row\.id\} row=\{row\} \/>\n\s*\)\)\}\n\s*<\/SortableContext>/g;
    const standardMap = `{table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}`;
    content = content.replace(sortableRegex, standardMap);

    // Fix FlexRender in header
    content = content.replace(/<FlexRender header=\{header\} \/>/g, '{flexRender(header.column.columnDef.header, header.getContext())}');
    
    // Fix filteredSelectedRowModel footer count
    content = content.replace(/\{table\.getFilteredSelectedRowModel\(\)\.rows\.length\} of \{" "\}\n\s*\{table\.getFilteredRowModel\(\)\.rows\.length\} row\(s\) selected\./g, 'Total {table.getFilteredRowModel().rows.length} row(s).');

    fs.writeFileSync(file, content);
}
console.log('Done replacing content');
