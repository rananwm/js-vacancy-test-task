import { userService } from 'resources/user';
import { AppKoaContext, AppRouter } from 'types';

async function controller(ctx: AppKoaContext) {
  ctx.body = {
    ...userService.getPublic(ctx.state.user),
  };
}

export default (router: AppRouter) => {
  router.get('/', controller);
};
