<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="Post in Posts" :key="Post.id" class="col-6">
        <Post :Post="Post" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import Post from "../components/Post.vue";

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
    };
  },
  components: { Post },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
