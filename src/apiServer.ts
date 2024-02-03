import { FastifyInstance, FastifyListenOptions } from "fastify"
import { registerDirectories } from "./misc"
export default class Server{
    #dir:string
    #fastify:FastifyInstance
    constructor(fastify:FastifyInstance,dir:string){
        this.#fastify = fastify
        this.#dir = dir
    }
    
    async init():Promise<void>{
        await registerDirectories(this.#dir,this.#fastify)
    }

    start(opt: FastifyListenOptions){
        return this.#fastify.listen(opt)
    }
}