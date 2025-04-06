/**
 * `cache` middleware
 */

import type { Core } from '@strapi/strapi';
import { Context, Next } from 'koa';
import redisClient from '../utils/redis';

const CACHE_TTL = 60 * 60; // 1 hour in seconds

const generateCacheKey = (ctx: Context): string => {
  return ctx.method + ':' + ctx.url; // Method + URL as key
};

const clearCacheForKeyPrefix = async (keyPrefix: string) => {
  try {
    const keys = await redisClient.keys(`${keyPrefix}*`);
    if (keys.length > 0) {
      await redisClient.del(...keys);
      strapi.log.info(`Cache evicted for key prefix: ${keyPrefix}`);
    }
  } catch (error) {
    strapi.log.error('Error evicting cache:', error);
  }
};


export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: Next) => {
    strapi.log.info('In cache middleware.');

    const key = generateCacheKey(ctx);

    if (ctx.method === 'GET') {
      try {
        const cached = await redisClient.get(key);
        if (cached) {
          ctx.body = JSON.parse(cached);
          ctx.status = 200;
          strapi.log.info(`Cache HIT: ${key}`);
          return;
        }
      } catch (error) {
        strapi.log.error('Redis GET error:', error);
      }
    }

    await next(); // Proceed to controller

    if (ctx.method === 'GET' && ctx.status === 200) {
      try {
        await redisClient.set(key, JSON.stringify(ctx.body), 'EX', CACHE_TTL);
      } catch (error) {
        strapi.log.error('Redis SET error:', error);
      }
    }

    if (ctx.method === 'POST' || ctx.method === 'PUT' || ctx.method === 'DELETE') {
      // Invalidate cache for the base path (e.g., /api/articles)
      const keyPrefix = ctx.path;
      await clearCacheForKeyPrefix(keyPrefix);
    }
  };
};
