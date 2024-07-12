import { pascalCase } from 'change-case';
import { glob } from 'glob';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'path';

const outDir = './src';

const createIcon = async (srcFile, destFile) => {
	console.log(`Reading svg: ${srcFile}`);

	let svg = await readFile(srcFile);
	svg = svg.toString().replace('<svg', '<svg class={props.class} style={props.style} ref={ref} ');

	let code = `import { JSX, forwardRef } from 'preact/compat';
  export default forwardRef<SVGSVGElement, JSX.SVGAttributes<SVGSVGElement> & JSX.HTMLAttributes<EventTarget>>(
    (props, ref) => (${svg})
  );`;

	console.log(`Writing icon: ${destFile}`);

	// write file
	return writeFile(destFile, code);
};

try {
	const indexEntries = [];
	const srcFiles = await glob('./src/*.svg');
	const ops = srcFiles.map((f) => {
		const fname = path.basename(f, '.svg');

		const dest = path.resolve(outDir, `${fname}.tsx`);
		const src = path.resolve(f);
		indexEntries.push(`export { default as ${pascalCase(fname)}Icon } from './${fname}';`);
		return createIcon(src, dest);
	});

	ops.push(writeFile(path.resolve(outDir, 'main.ts'), indexEntries.join('\n')));

	await Promise.all(ops);
} catch (e) {
	console.error(e);
}
