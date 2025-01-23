import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string(),
        }),
        response: {
          201: z.object({
            uploadId: z.string(),
          }),
          400: z.object({
            message: z.string().describe('Validation error'),
            issues: z.object({}),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.send({ uploadId: '123' })
    }
  )
}
