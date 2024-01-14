import { api } from './AxiosService.js';
import { AppState } from '../AppState.js';
import { Ad } from '../models/Ad.js';
import { logger } from '../utils/Logger.js';

class AdsService {
  async getAds() {
    const response = await api.get('api/ads');
    logger.log("GOT ADS", response.data);
    AppState.ads = response.data.map(adData => new Ad(adData));
    logger.log(AppState.ads)
  }
}

export const adsService = new AdsService();
