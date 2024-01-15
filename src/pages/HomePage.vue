<template>
  <div class="container-fluid">
    <div class="row">

      <SearchBar @search="goToSearchResults" />

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
    <div class="navigation-buttons">
      <button v-if="olderPosts" @click="getOlderPosts">Older Posts</button>
      <button v-if="newerPosts" @click="getNewerPosts">Newer Posts</button>
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
import { adsService } from "../services/AdsService";
import { useRouter } from "vue-router";
import SearchBar from "../components/SearchBar.vue";

export default {
  setup() {
    const router = useRouter();
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {

        Pop.error(error);
      }
    }

    async function getAds() {
      try {
        await adsService.getAds();
      }
      catch (error) {
        Pop.error(error);
      }
    }

    async function getOlderPosts() {
      if (AppState.olderPosts) {
        await postsService.getPosts(AppState.olderPosts);
      }
    }

    async function getNewerPosts() {
      if (AppState.newerPosts) {
        await postsService.getPosts(AppState.newerPosts);
      }
    }
    function goToSearchResults(searchTerm) {
      router.push({ name: 'SearchResults', query: { q: searchTerm } });
    }

    onMounted(() => {
      getPosts();
      getAds();
    });

    return {
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
      getOlderPosts,
      getNewerPosts,
      goToSearchResults
    };
  },
  components: { PostCard, Ad, SearchBar },
};
</script>

<style scoped lang="scss"></style>
