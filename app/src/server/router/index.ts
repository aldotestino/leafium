import * as trpc from '@trpc/server';
import { Context } from '../context';
import { deviceRouter } from './deviceRouter';
import { positionRouter } from './positionRouter';

export const serverRouter = trpc.router<Context>()
  .merge('position.', positionRouter)
  .merge('device.', deviceRouter);

export type ServerRouter = typeof serverRouter;