import { FastifyInstance } from "fastify";
import { defineRoute } from "../../route";

export default defineRoute(async (fastify)=>{
    fastify.get('/b',async (request, reply) =>{
        return { time:Date.now() }
    })
})