// services/SearchService.js
import { api } from './AxiosService';
import { AppState } from '../AppState';
import { Profile } from '../models/Profile';
import { Post } from '../models/Post';

class SearchService {

  async searchProfilesAndPosts(searchTerm) {
    try {
      const profileResponse = await api.get(`api/profiles/search?query=${searchTerm}`);
      console.log('📡🔍 Profiles', profileResponse.data);
      AppState.profileSearchResults = profileResponse.data.map(profile => new Profile(profile));

      const postResponse = await api.get(`api/posts/search?query=${searchTerm}`);
      console.log('📡🔍 Posts', postResponse.data);
      AppState.postSearchResults = postResponse.data.map(post => new Post(post));


      AppState.searchedTerm = searchTerm;
      AppState.searchCurrentPage = postResponse.data.page; 
      AppState.searchTotalPages = postResponse.data.total_pages;
    } catch (error) {
      console.error('Search failed:', error);
    }
  }

  async clearSearch() {
    AppState.searchedTerm = '';
    AppState.profileSearchResults = [];
    AppState.postSearchResults = [];
  }
}

export const searchService = new SearchService();
