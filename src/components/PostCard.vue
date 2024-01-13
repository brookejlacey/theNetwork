<template>
  <div class="post-card">
      
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img class="profile-picture" :src="post.creator.picture" alt="Profile image" />
      </router-link>
  
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ post.creator.name }}</h5>
      <p class="card-text">{{ post.body }}</p>
      <p class="card-text">
        <small class="text-muted">Posted on {{ new Date(post.createdAt).toLocaleDateString() }}</small>
      </p>
      <img :src="post.imgUrl" class="card-img-top" alt="Post image" />
        <a href="#" class="btn btn-primary">Like</a>
        <span>{{ post.likeIds.length }} likes</span>
      </div>
    </div>
  </div>
<!-- 
  <div class="media">
    <img class="mr-3" :src="post.imgUrl" alt="Generic placeholder image" />
    <div class="media-body">
      <p class="card-body fs-5">{{ post.body }}</p>
          <button type="button" class="btn ">LIKE</button>
   </div> -->

</template>

<script>
import { Post } from "../models/Post";
import { RouterLink } from "vue-router";

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    return {};
  },
  components: { RouterLink },
};
</script>

<style lang="scss" scoped>
.profile-picture {
  cursor: pointer;
}
.card-img-top {
  width: 100%;
  height: auto;
  object-fit: cover;
  }
</style>
