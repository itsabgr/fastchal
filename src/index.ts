import Fastify from "fastify"
import APIServer from './apiServer'
import * as path from 'node:path'
(async ()=>{
 const server = new APIServer( Fastify(),path.join(__dirname,'routes'))
 await server.init()
 await server.start({
    port: +process.env.PORT!
 })
})().catch(console.error)