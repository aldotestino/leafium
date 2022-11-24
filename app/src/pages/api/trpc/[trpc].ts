import * as trcpNext from '@trpc/server/adapters/next';

import { serverRouter } from '../../../server/router';
import { createContext } from '../../../server/context';

export default trcpNext.createNextApiHandler({
  router: serverRouter,
  createContext
});