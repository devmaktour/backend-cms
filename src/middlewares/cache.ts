import type { Core } from '@strapi/strapi';
import { Context, Next } from 'koa';
import redisClient from '../utils/redis';
import pluralize from 'pluralize';

const CACHE_TTL = 60 * 60; // 1 hour in seconds
const CACHE_PREFIX = 'cache:api';
const CACHE_ELIGIBLE_MODELS = [
  'blog',
  'customer-user',
  'faq',
  'faq-category',
  'gallery',
  'package',
  'hajj-info',
  'privacy-policy',
  'tnc',
  'umroh-info'
]

export const generateCacheKeyFromModel = (modelName: string): string => {
  if (!CACHE_ELIGIBLE_MODELS.includes(modelName)) {
    return null;
  }

  return `${CACHE_PREFIX}:${modelName}`;
}

const generateCacheKeyFromUrl = (url: string): string => {
  const parts = url.split('/').filter(part => part.length > 0);
  if (!parts || parts.length < 2) {
    strapi.log.warn(`Invalid URL for cache key generation: ${url}`);
    return null;
  }

  const singularModelName = pluralize.singular(parts[1]);
  if (!CACHE_ELIGIBLE_MODELS.includes(singularModelName)) {
    return null;
  }

  if (parts.length == 2 && parts[1]) {
    return `${CACHE_PREFIX}:${singularModelName}`;
  }

  if (parts.length > 2 && parts[1]) {
    const id = parts[2];
    return `${CACHE_PREFIX}:${singularModelName}:${id}`;
  }

  strapi.log.warn(`Invalid URL for cache key generation: ${url}`);
  return null;
}

export const clearCacheForKeyPrefix = async (keyPrefix: string) => {
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
    const key = generateCacheKeyFromUrl(ctx.url);
    if (!key) {
      return await next(); // Proceed to controller
    }

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
  };
};