import esbuild from "esbuild";
import { execSync } from "child_process";

execSync('tsc --emitDeclarationOnly --outDir dist', { stdio: 'inherit' });

esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    platform: 'node',
    format: 'esm',
    sourcemap: false,
    minify: true,
    tsconfig: './tsconfig.json',
    external: ['@ragempcommunity/types-client', '@ragempcommunity/types-server', '@ragempcommunity/types-cef']
}).catch(() => process.exit(1));