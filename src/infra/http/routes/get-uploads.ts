import { InvalidFileFormat } from '@/app/functions/errors/invalid-file-format'
import { getUploads } from '@/app/functions/get-uploads'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getUploadsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/uploads',
    {
      schema: {
        tags: ['uploads'],
        summary: 'Get uploads',
        querystring: z.object({
          searchQuery: z.string().optional(),
          sortBy: z.enum(['name', 'createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          page: z.coerce.number().int().positive().optional().default(1),
          pageSize: z.coerce.number().int().positive().optional().default(20),
        }),
        response: {
          200: z.object({
            uploads: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                remoteKey: z.string(),
                remoteUrl: z.string(),
                createdAt: z.date(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery, sortBy, sortDirection, page, pageSize } =
        request.query
      const result = await getUploads({
        searchQuery,
        sortBy,
        sortDirection,
        page,
        pageSize,
      })
      const { uploads, total } = unwrapEither(result)
      return reply.status(200).send({ uploads, total })
    }
  )
}
