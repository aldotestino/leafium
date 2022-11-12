import * as trpc from '@trpc/server';
import { Context } from '../context';
import * as z from 'zod';

export const deviceRouter = trpc.router<Context>()
  .mutation('check', {
    input: z.object({
      gatewayId: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      try {
        const { gatewayId } = input;

        const gateway = await ctx.prisma.gateway.findUnique({
          where: {
            gatewayId,
          }
        });

        if (!gateway) {
          throw new trpc.TRPCError({
            code: 'BAD_REQUEST',
            message: `Gateway with id "${gatewayId}" doesn't exixst`,
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