import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { FastifyInstance } from 'fastify';
import { Registerar, RouteSymbol } from './route';

export async function registerDirectories(dir: string, fastify: FastifyInstance) {
    for await (const filePath of walkDirectory(dir)) {
        if ('.js' !== path.extname(filePath)) {
            continue
        }
        const module = await import(filePath);
        const fn = (module?.default?.default ?? {})[RouteSymbol] as Registerar;
        if (typeof fn !== 'function') {
            continue
        }
        await fn(fastify);
    }
}

export async function* walkDirectory(dir: string): AsyncGenerator<string> {
    if (!(await fs.stat(dir)).isDirectory()) {
        throw new Error(`${dir} is not a directory`)
    }
    const dirs = await fs.readdir(dir)
    for (const dirPath of dirs) {
        const fullPath = path.join(dir, dirPath)
        if ((await fs.stat(fullPath)).isDirectory()) {
            yield* walkDirectory(fullPath)
        } else {
            yield fullPath
        }
    }
}