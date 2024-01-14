import { api } from './AxiosService.js';
import { AppState } from '../AppState.js';

class AdsService {
  async getAds() {
    const res = await api.get('api/ads');
    AppState.ads = res.data.map(ad => new Ad(ad));
  }
}

export const adsService = new AdsService();
