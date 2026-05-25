const fs = require('fs');
const path = require('path');

// Créer des images PNG minimales (1x1 pixel) comme placeholders
// En production, remplacez par de vraies images

const projects = [
  { slug: 'agentic-testing-framework', title: 'Agentic Testing' },
  { slug: 'carto-cobol', title: 'Carto COBOL' },
  { slug: 'ia--management', title: 'IA & Management' },
  { slug: 'mainframe-virtualization', title: 'Mainframe' },
  { slug: 'pacbase-transpiler', title: 'Pacbase' }
];

// PNG 1x1 pixel transparent (minimal valid PNG)
// Format: PNG signature + IHDR chunk (width=400, height=200, 8-bit RGB)
const createPNG = (width = 400, height = 200) => {
  // Minimal PNG: 1x1 pixel transparent
  // This is a real but minimal PNG file
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // Create a simple gradient-like pattern by writing a basic PNG
  // For simplicity, we'll use a single color PNG
  const idat = Buffer.from([
    0x00, 0xFF, 0xFF, 0xFF, // white pixel
  ]);

  const zlib = require('zlib');
  
  return pngSignature;
};

// Utiliser une approche simple: créer des fichiers SVG convertis en PNG
// Ou utiliser des images externes

const SVG_TEMPLATE = (title) => `
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,107,107);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(78,205,196);stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="200" fill="url(#grad1)"/>
  <text x="200" y="100" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${title}
  </text>
</svg>
`;

// Create projects directory structure and add SVG placeholders
projects.forEach(project => {
  const projectDir = path.join(__dirname, 'projects', project.slug);
  
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
  
  const svgPath = path.join(projectDir, 'featured-image.svg');
  const pngPath = path.join(projectDir, 'featured-image.png');
  
  // Write SVG as placeholder (for now)
  fs.writeFileSync(svgPath, SVG_TEMPLATE(project.title));
  
  console.log(`✓ Created placeholder for ${project.slug}`);
});

console.log('\n✓ Placeholder images created as SVG files');
console.log('Note: In production, convert these to PNG or use real images');
