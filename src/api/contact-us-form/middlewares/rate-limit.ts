import { RateLimit, Stores } from "koa2-ratelimit";
import redisClient from "../../../utils/redis";
import { Core } from "@strapi/strapi";
import { Context, Next } from "koa";

export default (_config: any, { }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: Next) => {
    return RateLimit.middleware({
      store: new Stores.Redis({
        client: redisClient,
      }),
      interval: { min: 1 },
      max: parseInt(process.env.CONTACT_US_RATE_PER_MIN || '100'), // limit each IP to x requests per minute
      headers: true,
      prefixKey: 'contact-us-rate-limit',
      message: "Too many requests, please try again later.",
    })(ctx, next);
  };
};