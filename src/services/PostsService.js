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
}

export const postsService = new PostsService();
