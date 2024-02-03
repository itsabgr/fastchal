import {FastifyInstance} from 'fastify'

export const RouteSymbol = Symbol("RouteSymbol")
export type Registerar = (fastify:FastifyInstance)=>Promise<void>
export interface route{
    [RouteSymbol]: Registerar
}

export function defineRoute(fn:Registerar):route{
    return {
        [RouteSymbol]:fn
    };
}
