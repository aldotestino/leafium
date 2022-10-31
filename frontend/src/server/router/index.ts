import * as trpc from '@trpc/server';
import { Context } from '../context';
import { positionRouter } from './positionRouter';

export const serverRouter = trpc.router<Context>()
  .merge('position.', positionRouter);

export type ServerRouter = typeof serverRouter;