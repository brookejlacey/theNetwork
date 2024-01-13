<template>

  <div class="media">
    <img class="mr-3" :src="post.imgUrl" alt="Generic placeholder image" />
    <div class="media-body">
      <p class="card-body fs-5">{{ post.body }}</p>
          <!-- <button type="button" class="btn ">LIKE</button> -->
    </div>
  </div>


  <!-- <div class="card">
    <img :src="post.imgUrl" class="img-fluid img" />
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <p class="card-body">{{ post.body }}</p>
        <router-link
          :to="{ name: 'Profile', params: { profileId: post.creatorId } }"
        >
          <img :src="post.creator.picture" />
        </router-link>
        <p>{{ post.creator.name }}</p>
      </div>
    </div>
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
.img {
  height: 30vh;
  object-fit: cover;
}
</style>
