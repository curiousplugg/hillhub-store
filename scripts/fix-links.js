const fs = require('fs');
const path = require('path');

// Files that need Link fixes
const files = [
  'src/components/Hero.tsx',
  'src/components/Footer.tsx',
  'src/components/FeaturedProducts.tsx',
  'src/app/cancel/page.tsx',
  'src/app/cart/page.tsx',
  'src/app/success/page.tsx',
  'src/app/products/MinecraftCompass/page.tsx',
  'src/app/products/minecraft-compass/page.tsx'
];

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Add Link import if not present
    if (!content.includes("import Link from 'next/link'") && content.includes('<a href="/')) {
      const importMatch = content.match(/import.*from.*['"]react['"]/);
      if (importMatch) {
        content = content.replace(importMatch[0], importMatch[0] + "\nimport Link from 'next/link';");
      } else {
        // Add after the first import
        const firstImport = content.match(/import.*from.*['"][^'"]*['"]/);
        if (firstImport) {
          content = content.replace(firstImport[0], firstImport[0] + "\nimport Link from 'next/link';");
        }
      }
    }
    
    // Replace <a href="/ with <Link href="/
    content = content.replace(/<a href="\//g, '<Link href="/');
    content = content.replace(/<\/a>/g, '</Link>');
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('🎉 Link fixes completed!'); 