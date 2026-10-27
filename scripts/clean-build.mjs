import { lstat, realpath, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = await realpath(fileURLToPath(new URL("../", import.meta.url)));

// Rebuild content indexes from source, including when a collection becomes empty.
// Clear the output too, so deleted routes and search assets cannot survive a build.
for (const relativePath of [".astro", "node_modules/.astro", "dist"]) {
	const target = path.resolve(root, relativePath);
	try {
		const info = await lstat(target);
		const resolved = await realpath(target);
		const relative = path.relative(root, resolved);
		if (
			info.isSymbolicLink() ||
			!relative ||
			relative.startsWith(`..${path.sep}`) ||
			relative === ".." ||
			path.isAbsolute(relative)
		) {
			throw new Error(`Refusing to clean a path outside the project: ${relativePath}`);
		}
		await rm(target, { recursive: true, force: true });
		console.log(`[clean-build] Removed ${relativePath}`);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
}
