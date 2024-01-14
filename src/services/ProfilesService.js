import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('GOT PROFILE', response.data)
    // const newProfile = new Profile(response.data)
    AppState.activeProfile = new Profile(response.data)
  }

  async getPostsByProfileId(profileId, pageUrl = `api/profiles/${profileId}/posts`) {
    logger.log('got posts by profile id')
    const response = await api.get(pageUrl)
    AppState.profilePosts = response.data.posts.map(post => new Post(post));
    AppState.profileCurrentPage = response.data.page;
    AppState.profileOlder = response.data.older;
    AppState.profileNewer = response.data.newer;
  }

}

export const profilesService = new ProfilesService()