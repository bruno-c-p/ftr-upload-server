import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post('/uploads', (request, reply) => {
    reply.send({ message: 'Image uploaded' })
  })
}
