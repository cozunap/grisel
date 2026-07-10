const fs = require('fs');
const path = require('path');

const files = [
  { name: 'Home.tsx', source: 'index.html.txt' },
  { name: 'Services.tsx', source: 'services.html.txt' },
  { name: 'Membership.tsx', source: 'membership.html.txt' },
  { name: 'GiftCards.tsx', source: 'gift-cards.html.txt' },
  { name: 'About.tsx', source: 'about.html.txt' },
  { name: 'Contact.tsx', source: 'contact.html.txt' }
];

// Ensure src/pages directory exists
if (!fs.existsSync('src/pages')) {
  fs.mkdirSync('src/pages', { recursive: true });
}

files.forEach(file => {
  let content = fs.readFileSync(path.join('src', file.source), 'utf-8');
  
  // Extract body
  const bodyMatch = content.match(/<body>([\s\S]*?)<script src="assets\/js\/main.js"><\/script>\s*<\/body>/);
  if (bodyMatch) {
    content = bodyMatch[1];
  } else {
    // fallback
    const bodyMatch2 = content.match(/<body>([\s\S]*?)<\/body>/);
    if (bodyMatch2) content = bodyMatch2[1];
  }

  // Remove Cloudflare beacon script (if any)
  content = content.replace(/<script defer src="https:\/\/static\.cloudflareinsights\.com[^>]+><\/script>/g, '');

  // Convert HTML to JSX
  content = content.replace(/class="/g, 'className="');
  content = content.replace(/for="/g, 'htmlFor="');
  content = content.replace(/<img(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.replace(/>$/, ' />');
  });
  content = content.replace(/<br>/g, '<br />');
  content = content.replace(/<hr>/g, '<hr />');
  content = content.replace(/<input(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.replace(/>$/, ' />');
  });
  
  content = content.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').reduce((acc, rule) => {
      if (!rule.trim()) return acc;
      const firstColon = rule.indexOf(':');
      if (firstColon === -1) return acc;
      const key = rule.slice(0, firstColon).trim();
      const val = rule.slice(firstColon + 1).trim();
      if (key && val) {
        const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc.push(`${camelKey}: "${val.replace(/"/g, '\\"')}"`);
      }
      return acc;
    }, []);
    return `style={{ ${styleObj.join(', ')} }}`;
  });

  // Handle hrefs
  content = content.replace(/href="index\.html"/g, 'href="/"');
  content = content.replace(/href="services\.html"/g, 'href="/services"');
  content = content.replace(/href="membership\.html"/g, 'href="/membership"');
  content = content.replace(/href="gift-cards\.html"/g, 'href="/gift-cards"');
  content = content.replace(/href="about\.html"/g, 'href="/about"');
  content = content.replace(/href="contact\.html"/g, 'href="/contact"');
  content = content.replace(/href="booking\.html"/g, 'href="/booking"'); 

  // Fix entities
  content = content.replace(/&ndash;/g, '&#8211;');
  content = content.replace(/&rarr;/g, '&#8594;');
  content = content.replace(/&copy;/g, '&#169;');

  // Fix checked attributes in checkboxes or radio buttons if any exist
  content = content.replace(/ checked /g, ' defaultChecked ');

  // Fix TS / JSX attributes
  content = content.replace(/referrerpolicy/g, 'referrerPolicy');
  content = content.replace(/tabindex="0"/g, 'tabIndex={0}');
  content = content.replace(/rows="(\d+)"/g, 'rows={$1}');

  const component = `
import { useEffect } from 'react';
import '../index.css';

export default function ${file.name.replace('.tsx', '')}() {
  useEffect(() => {
    // JS logic to initialize components can go here
  }, []);

  return (
    <>
      ${content}
    </>
  );
}
`;

  fs.writeFileSync(path.join('src/pages', file.name), component);
});

console.log('Conversion complete.');
