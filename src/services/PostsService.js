import { logger } from "../utils/Logger";
import { api } from "./AxiosService.js";
import { Post } from "../models/Post";
import { AppState } from "../AppState";

class PostsService {
  async getPosts() {
    const response = await api.get("api/posts");
    logger.log("GOT POSTS", response.data);
    const newPosts = response.data.posts.map((post) => new Post(post));
    AppState.posts = newPosts;
  }

  async getPostsByProfileId(profileId) {
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('GOT POSTS BY CREATOR ID', response.data)
    const newPosts = response.data.posts.map(post => new Post(post))
    AppState.profilePosts = newPosts
  }

  clearAppState() {
    AppState.activeProfile = null
    AppState.profilePosts = []
  }
}

export const postsService = new PostsService();
