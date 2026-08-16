const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/manis/OneDrive/Documents/Github Projects/code1/src';
const destDir = 'c:/Users/manis/OneDrive/Documents/Github Projects/code1-main/src';

const replacements = {
    'bg-[#080C14]': 'bg-background',
    'bg-[#0b1329]': 'bg-card',
    'text-blue-400': 'text-primary',
    'text-blue-300': 'text-primary/80',
    'bg-blue-500/10': 'bg-primary/10',
    'bg-blue-500/20': 'bg-primary/20',
    'bg-blue-600/20': 'bg-primary/20',
    'border-blue-500/20': 'border-primary/20',
    'border-blue-500/30': 'border-primary/30',
    'border-blue-400/40': 'border-primary/40',
    'border-blue-400': 'border-primary',
    'text-cyan-400': 'text-primary',
    'text-cyan-500': 'text-primary',
    'border-cyan-500/30': 'border-primary/30',
    'border-cyan-500/20': 'border-primary/20',
    'border-cyan-400/40': 'border-primary/40',
    'border-cyan-400': 'border-primary',
    'bg-cyan-500/10': 'bg-primary/10',
    'bg-cyan-500/20': 'bg-primary/20',
    'gradient-text': 'text-gradient',
    'variant=\"glow\"': 'variant=\"primary\"',
    'variant=\"magnetic\"': 'variant=\"outline\"',
    'variant=\"glass\"': 'variant=\"outline\"',
    'size=\"xl\"': 'size=\"lg\"',
    'bg-slate-950/60': 'bg-card/60',
    'bg-slate-950/90': 'bg-card/90',
    'bg-slate-950/80': 'bg-card/80',
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
    '<HeroBackground />': '<ThreeBackground />',
    'import { HeroBackground } from "@/components/3d/HeroBackground";': 'import { ThreeBackground } from "@/components/landing/ThreeBackground";',
    'href=\"/register\"': 'href=\"/signup\"'
};

const skipFiles = [
    'layout.tsx',
    'globals.css',
    'firebase.ts',
    'AuthContext.tsx',
    'ToastContext.tsx',
    'ThemeContext.tsx',
    'RootProvider.tsx'
];

function processDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.statSync(srcPath).isDirectory()) {
            if (item === 'context' || item === 'lib') continue; // skip context and lib logic entirely
            processDir(srcPath, destPath);
        } else {
            if (skipFiles.includes(item)) continue;
            
            let content = fs.readFileSync(srcPath, 'utf-8');
            for (const [k, v] of Object.entries(replacements)) {
                content = content.split(k).join(v);
            }
            
            // Fix any stray <div className="..."> replacing with <main> for pages if needed, but not critical
            
            fs.writeFileSync(destPath, content, 'utf-8');
            console.log('Processed:', destPath);
        }
    }
}

processDir(srcDir, destDir);
console.log('Migration complete');
