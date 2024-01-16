import { logger } from "../utils/Logger";
import { api } from "./AxiosService.js";
import { Post } from "../models/Post";
import { AppState } from "../AppState";

class PostsService {
  async getPosts(pageUrl = 'api/posts') {
    console.log('got posts for pages')
    const response = await api.get(pageUrl);
    logger.log("GOT POSTS", response.data);
    AppState.posts = response.data.posts.map(post => new Post(post));
    AppState.currentPage = response.data.page;
    AppState.older = response.data.older;
    AppState.newer = response.data.newer;
  }

  async getProfilePosts(profileId) {
    const response = await api.get(`api/profiles/${profileId}/posts`);
    console.log('got profile posts', response.data);
    AppState.profilePosts = response.data.posts.map(post => new Post(post));
    AppState.profileCurrentPage = response.data.page;
    AppState.profileOlder = response.data.older;
    AppState.profileNewer = response.data.newer;
  }

  async getPostById(postId) {
    const response = await api.get(`api/posts/${postId}`);
    console.log('got posts by ID', response.data);
    AppState.activePost = new Post(response.data);
  }

  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    console.log('deleted post', response.data);
    const indexToRemove = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(indexToRemove,1)
  }

async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`);
    const postIndex = AppState.posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      AppState.posts[postIndex].likeIds = response.data.likeIds;
    }

}


}

export const postsService = new PostsService();