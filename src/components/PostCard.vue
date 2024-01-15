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
        <img :src="post.imgUrl" class="card-img-top img-fluid" alt="Post image" />

        <button v-if="isLoggedIn" @click="togglePostLike(post)">
          {{ post.likeIds.includes(account.id) ? 'Unlike' : 'Like' }}
        </button>
        <span>{{ post.likeIds.length }} likes</span>
      </div>
      <!-- <a href="#" class="btn btn-primary">Like</a>
        <span>{{ post.likeIds.length }} likes</span> -->
    </div>
  </div>
</template>

<script>
import { Post } from "../models/Post";
import { RouterLink } from "vue-router";
import { computed } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    const account = computed(() => AppState.account);
    const isLoggedIn = computed(() => !!account.value.id);

    async function togglePostLike(post) {
      if (isLoggedIn.value) {
        try {
          await postsService.toggleLike(post);
        } catch (error) {
          console.error('Error in toggling post like:', error);
        }
      }
    }

    return { isLoggedIn, account, togglePostLike };
  },
  components: { RouterLink },
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
</style>