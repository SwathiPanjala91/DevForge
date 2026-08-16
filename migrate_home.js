const fs = require('fs');

let content = fs.readFileSync('c:/Users/manis/OneDrive/Documents/Github Projects/code1/src/app/page.tsx', 'utf-8');

const replacements = {
    'bg-[#080C14]': 'bg-background',
    'text-blue-400': 'text-primary',
    'text-blue-300': 'text-primary/80',
    'bg-blue-500/10': 'bg-primary/10',
    'bg-blue-500/20': 'bg-primary/20',
    'bg-blue-600/20': 'bg-primary/20',
    'border-blue-500/20': 'border-primary/20',
    'border-blue-500/30': 'border-primary/30',
    'border-blue-400/40': 'border-primary/40',
    'border-blue-400': 'border-primary',
    'gradient-text': 'text-gradient',
    'variant=\"glow\"': 'variant=\"primary\"',
    'variant=\"magnetic\"': 'variant=\"outline\"',
    'size=\"xl\"': 'size=\"lg\"',
    'bg-slate-950/60': 'bg-card/60',
    'bg-slate-950/90': 'bg-card/90',
    'bg-slate-950/40': 'bg-card/40',
    'bg-slate-900': 'bg-card',
    'border-white/10': 'border-border',
    'border-white/15': 'border-border/80',
    'border-white/20': 'border-border/50',
    'text-gray-100': 'text-white',
    'text-gray-200': 'text-white/90',
    'text-gray-300': 'text-white/70',
    'text-gray-400': 'text-white/50',
    'text-emerald-400': 'text-secondary',
    'bg-emerald-500/10': 'bg-secondary/10',
    'border-emerald-500/30': 'border-secondary/30',
    'bg-emerald-400': 'bg-secondary',
    '<HeroBackground />': '<ThreeBackground />\n      <Navbar />',
    'import { HeroBackground } from "@/components/3d/HeroBackground";': 'import { ThreeBackground } from "@/components/landing/ThreeBackground";\nimport { Navbar } from "@/components/landing/Navbar";',
    'import { Footer } from "@/components/ui/Footer";': 'import { Footer } from "@/components/landing/Footer";',
    'href="/register"': 'href="/signup"'
};

for (const [k, v] of Object.entries(replacements)) {
    content = content.split(k).join(v);
}

content = content.replace('<div className="min-h-screen relative overflow-hidden bg-background text-white">', '<main className="min-h-screen relative overflow-hidden bg-background text-white">');
content = content.replace('</div>\n  );\n}', '</main>\n  );\n}');

fs.writeFileSync('c:/Users/manis/OneDrive/Documents/Github Projects/code1-main/src/app/page.tsx', content, 'utf-8');
console.log("Successfully rewritten page.tsx");
