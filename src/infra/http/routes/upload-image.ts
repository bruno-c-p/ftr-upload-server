import { InvalidFileFormat } from '@/app/functions/errors/invalid-file-format'
import { uploadImage } from '@/app/functions/upload-image'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        response: {
          201: z.null().describe('Image uploaded successfully'),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const MAX_FILE_SIZE = 1024 * 1024 * 2
      const uploadedFile = await request.file({
        limits: { fileSize: MAX_FILE_SIZE },
      })
      if (!uploadedFile) {
        return reply.status(400).send({ message: 'File is required' })
      }
      const result = await uploadImage({
        fileName: uploadedFile.filename,
        contentType: uploadedFile.mimetype,
        contentStream: uploadedFile.file,
      })
      if (isRight(result)) {
        console.log(unwrapEither(result))
        return reply.status(201).send()
      }
      const error = unwrapEither(result)
      switch (error.constructor.name) {
        case InvalidFileFormat.name:
          return reply.status(400).send({ message: 'Invalid file format' })
      }
    }
  )
}
