import { IMessageService } from './IMessageService';

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      if (prop === 'send') {
        return function (message: string) {
          const now = Date.now();
          if (now - lastCallTime >= intervalMs) {
            lastCallTime = now;
            return target.send.call(target, message);
          } else {
            console.log('[RateLimit] skipped');
          }
        };
      }

      const value = Reflect.get(target, prop);
      return typeof value === 'function' ? value.bind(target) : value;
    },
  });
}
