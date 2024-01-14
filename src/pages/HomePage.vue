<template>
  <div>THE NETWORK</div>
  <div class="container-fluid">
    <div class="row">
      
      <div class="col-md-8">
        <section class="row">
          <div v-for="post in posts" :key="post.id" class="col-12">
            <PostCard :post="post" />
          </div>
        </section>
      </div>
      
      <div class="col-md-4">
          <Ad v-for="ad in ads" :key="ad.title" :ad="ad" />
        </div>
    </div>
  </div>
</template>

<script>
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import PostCard from "../components/PostCard.vue";
import Ad from "../components/Ad.vue";

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
  components: { PostCard, Ad },
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
