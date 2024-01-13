<template>
  <div>THE NETWORK</div>
  <div class="container-fluid">
    <section class="row">
      <div v-for="post in posts" :key="post.id" class="col-12">
        <PostCard :post="post" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import PostCard from "../components/PostCard.vue";

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      } 
      catch (error) {

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
  components: { PostCard },
};
</script>

<style scoped lang="scss">
// .home {
//   display: grid;
//   height: 80vh;
//   place-content: center;
//   text-align: center;
//   user-select: none;

//   .home-card {
//     width: clamp(500px, 50vw, 100%);

//     > img {
//       height: 200px;
//       max-width: 200px;
//       width: 100%;
//       object-fit: contain;
//       object-position: center;
//     }
//   }
// }
</style>
