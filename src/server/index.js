import { join } from 'path';
import { parse } from 'url';

import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';

import serveRootFiles from 'server/serveRootFiles';

const internalPrefixes = ['/_next/*', '/static/*'];
const dir = join(__dirname, '../../lib');

export default function server({ dev, port }) {
  const app = next({ dev, dir });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    router.get(internalPrefixes, async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    router.get('*', async ctx => {
      const { pathname } = parse(ctx.url);
      await app.render(ctx.req, ctx.res, '/', { pathname });
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })
    server.use(serveRootFiles);
    server.use(router.routes());

    server.listen(port, error => {
      if (error) {
        throw error;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}
