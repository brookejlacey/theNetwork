<template>
  <div class="post-card">


    <div class="card mb-3">
      <div class="card-body">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <img class="profile-picture" :src="post.creator.picture" alt="Profile image" />
        </router-link>
        <h5 class="card-title">{{ post.creator.name }}</h5>
        <p class="card-text">{{ post.body }}</p>
        <p class="card-text">
          <small class="text-muted">Posted on {{ new Date(post.createdAt).toLocaleDateString() }}</small>
        </p>
        <img v-if="post.imgUrl" :src="post.imgUrl" class="card-img-top img-fluid" alt="Post image" />

  <button @click="deletePost(post.id)" v-if="account.id == post.creatorId" class="btn btn-danger delete-button" title="delete post"><i class="mdi mdi-delete-forever"></i></button>

        <button @click="likePost(post.id)" v-if="account.id" class="btn" title="like post"><i class="mdi mdi-heart"></i></button>
        
        <span>{{ post.likeIds.length }} likes</span>

      </div>

    </div>
  </div>
</template>

<script>
import { Post } from "../models/Post";
import { RouterLink } from "vue-router";
import { computed, popScopeId } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from "../utils/Pop";

export default {
  props: { post: { type: Post, required: true }},
  setup(props) {

    return { 
      account: computed(() => AppState.account),

      async deletePost(postId) {
        try {
          if(await Pop.confirm('Are you sure')){
            await postsService.deletePost(postId)
            AppState.profilePosts = AppState.profilePosts.filter(post => post.id !== postId)
            Pop.success('deleted post')
          }
        } catch (error) {
          Pop.error(error)
        }
      },

      async likePost(postId) {
        await postsService.likePost(postId)
        AppState.profilePosts = AppState.profilePosts.filter(post => post.id !== postId)
      }

  }
}
};

</script>


<style lang="scss" scoped>
.profile-picture {
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover
}

.card-img-top {
  width: 100%;
  height: auto;
  object-fit: cover;
}

  .delete-button{
    position: absolute;
    right: 0px;
    top: 0px
  }
</style>