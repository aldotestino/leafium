import * as trpc from '@trpc/server';
import { Context } from '../context';
import * as z from 'zod';
import prisma from '../../lib/prisma';

export const deviceRouter = trpc.router<Context>()
  .query('check', {
    input: z.object({
      deviceId: z.string()
    }),
    resolve: async ({ input }) => {
      try {
        //forse non necessario se si usa il contratto
        const deviceId = input.deviceId;
        const gateway = await prisma.gateway.findUnique({
          where:{
            deviceId,
          }
        });
        //check se si usa direttamente l'update cosa restituisce quando non trova un gateway con
        if(!gateway){
          throw new trpc.TRPCError({
            code: 'BAD_REQUEST',
            message: 'Gateway do not exist',
          });
        }

        return {
          success: true,
        };

      } catch (err: any) {
        console.log(err);
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message
        });
      }
    }
  });