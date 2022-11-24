import * as trpc from '@trpc/server';
import { Context } from '../context';
import * as z from 'zod';

export const positionRouter = trpc.router<Context>()
  .mutation('forward', {
    input: z.object({
      searchTerm: z.string()
    }),
    resolve: async ({ input }) => {
      try {
        const url = new URL('http://api.positionstack.com/v1/forward');
        url.searchParams.append('access_key', process.env.POSITIONSTACK_API_KEY!);
        url.searchParams.append('query', input.searchTerm);
        url.searchParams.append('limit', '10');
        url.searchParams.append('output', 'json');
        const res = await fetch(url);
        const { data }: { data: { latitude: number, longitude: number, label: string }[] } = await res.json();

        if (data.length === 0) {
          throw new trpc.TRPCError({
            code: 'BAD_REQUEST',
            message: `Location ${input} doesn't exist!`
          });
        }

        return {
          success: true,
          data: {
            locations: data.map(l => ({
              lat: l.latitude,
              long: l.longitude,
              label: l.label
            }))
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
  })
  .mutation('reverse', {
    input: z.object({
      coordinates: z.object({
        lat: z.string().regex(new RegExp('^-?([0-8]?[0-9]|90)(\\.[0-9]{1,14})?$')),
        long: z.string().regex(new RegExp('^-?([0-9]{1,2}|1[0-7][0-9]|180)(\\.[0-9]{1,15})?$')),
      }).array()
    }),
    resolve: async ({ input }) => {
      console.log(input);
      try {
        const locations: string[] = [];

        await Promise.all(input.coordinates.map(async ({ lat, long }) => {
          const url = new URL('http://api.positionstack.com/v1/reverse');
          url.searchParams.append('access_key', process.env.POSITIONSTACK_API_KEY!);
          url.searchParams.append('query', `${lat}, ${long}`);
          url.searchParams.append('limit', '1');
          url.searchParams.append('output', 'json');
          const res = await fetch(url);
          const { data }: { data: { administrative_area: string, region: string, country: string }[] } = await res.json();

          locations.push(`${data[0].administrative_area}, ${data[0].region}, ${data[0].country}`);
        }));

        return {
          success: true,
          data: {
            locations
          },
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