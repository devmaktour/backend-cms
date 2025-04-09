import axios from 'axios';
import redisClient from './redis';

const EXCHANGE_RATE_CACHE_KEY = 'currency:usd_idr';
const EXCHANGE_RATE_TTL = 60 * 60 * 24 * 365; // 1 year in seconds
const FRANKFURTER_API_URL = 'https://api.frankfurter.dev/v1/latest';

interface ExchangeRateData {
    lastHit: string; // YYYY-MM-DD format
    rate: number;
}

const getUsdToIdrRate = async (): Promise<number | null> => {
    try {
        const cachedData = await redisClient.get(EXCHANGE_RATE_CACHE_KEY);

        if (cachedData) {
            const { lastHit, rate } = JSON.parse(cachedData) as ExchangeRateData;
            const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD

            if (lastHit === today) {
                strapi.log.info('Using cached USD to IDR rate');
                return rate;
            } else {
                // Different day, refresh the cache
                strapi.log.info('Cached rate is outdated, refreshing...');
                const newRate = await fetchAndCacheUsdToIdrRate();
                if (newRate) {
                    return newRate;
                } else {
                    // If refresh fails, return the old rate to keep things running
                    strapi.log.warn('Failed to refresh rate, using potentially outdated cached rate');
                    return rate;
                }
            }
        } else {
            // No cache, fetch and cache
            return await fetchAndCacheUsdToIdrRate();
        }
    } catch (error) {
        strapi.log.error('Error getting USD to IDR rate:', error);
        return null;
    }
};

const fetchAndCacheUsdToIdrRate = async (): Promise<number | null> => {
    try {
        const response = await axios.get(FRANKFURTER_API_URL, {
            params: {
                base: 'USD',
                symbols: 'IDR',
            },
        });

        if (response.data && response.data.rates && response.data.rates.IDR) {
            const rate = response.data.rates.IDR;
            const today = new Date().toISOString().split('T')[0];
            const dataToCache: ExchangeRateData = { lastHit: today, rate };
            await redisClient.set(EXCHANGE_RATE_CACHE_KEY, JSON.stringify(dataToCache), 'EX', EXCHANGE_RATE_TTL);
            strapi.log.info('Fetched and cached USD to IDR rate');
            return rate;
        }

        strapi.log.error('Failed to fetch USD to IDR rate');
        return null;
    } catch (error) {
        strapi.log.error('Error fetching/caching USD to IDR rate:', error);
        return null;
    }
};

const convertUsdToIdr = async (usdAmount: number): Promise<number | null> => {
    try {
        const exchangeRate = await getUsdToIdrRate();
        if (exchangeRate) {
            return usdAmount * exchangeRate;
        }
        return null;
    } catch (error) {
        strapi.log.error('Error converting USD to IDR:', error);
        return null;
    }
};

export { getUsdToIdrRate, convertUsdToIdr };