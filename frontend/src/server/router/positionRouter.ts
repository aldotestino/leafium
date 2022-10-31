import * as trpc from '@trpc/server';
import { Context } from '../context';
import * as z from 'zod';

export const positionRouter = trpc.router<Context>()
  .query('forward', {
    input: z.object({
      location: z.string()
    }),
    resolve: async ({ input }) => {
      try {
        const url = new URL('http://api.positionstack.com/v1/forward');
        url.searchParams.append('access_key', process.env.POSITIONSTACK_API_KEY!);
        url.searchParams.append('query', input.location);
        url.searchParams.append('limit', '1');
        url.searchParams.append('output', 'json');
        const res = await fetch(url);
        const { data }: { data: { latitude: number, longitude: number }[] } = await res.json();

        if (data.length === 0) {
          throw new trpc.TRPCError({
            code: 'BAD_REQUEST',
            message: `Location ${input} doesn't exist!`
          });
        }

        return {
          success: true,
          data: {
            lat: data[0].latitude,
            long: data[0].longitude
          }
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