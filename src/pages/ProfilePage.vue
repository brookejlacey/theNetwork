<template>
  <div class="container-fluid">
    <section v-if="profile" class="row">
      <div class="col-8 text-center my-3">

        <div class="cover-image-container">
          <img class="cover-img img-fluid" :src="profile.coverImg" :alt="profile.name + ' cover image'">
        </div>

        <img class="profile-picture" :src="profile.picture" :alt="profile.name">

        <h1>
          <span>{{ profile.name }}</span>
        </h1>

        <div>
          <a v-if="profile.github" :href="profile.github" :title="`Go to ${profile.name}'s GitHub`" target="_blank">
            <i class="mdi mdi-github" :class="{ 'github-icon': true, 'non-graduated': !profile.graduated }"></i>
          </a>
          <a v-if="profile.linkedin" :href="profile.linkedin" :title="`Go to ${profile.name}'s LinkedIn`" target="_blank">
            <i class="mdi mdi-linkedin"></i>
          </a>
        </div>

        <p>{{ profile.bio }}</p>
        <p v-if="profile.graduated">Alumni - {{ profile.class }}</p>
        <p v-else>Current Student - {{ profile.class }}</p>

      </div>

      <div class="col-8">
        <h2>Posts: {{ posts.length }}</h2>
        <section class="row">
          <div v-for="post in posts" :key="post.id" class="col-12 col-md-4 mb-3">
            <PostCard :post="post" />
          </div>
          <!-- <div class="navigation-buttons">
            <button v-if="olderProfilePosts" @click="getOlderPosts">Older Posts</button>
            <button v-if="newerProfilePosts" @click="getNewerPosts">Newer Posts</button>
          </div> -->
        </section>
      </div>
      <div class="col-md-4">
        <Ad v-for="ad in ads" :key="ad.title" :ad="ad" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js'
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
import Ad from "../components/Ad.vue";
import { adsService } from "../services/AdsService";

export default {
  setup() {
    const route = useRoute();
    const watchableProfileId = computed(() => route.params.profileId);


    onMounted(() => {
      getProfileById();
    });


    async function getProfileById() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
      } catch (error) {
        Pop.error(error);
      }
    }

    async function getPostsByProfileId() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getPostsByProfileId(profileId);
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

    async function getAds() {
      try {
        await adsService.getAds();
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(async () => {
      await getProfileById();
      await getPostsByProfileId();
      await getAds();
    });

    watch(watchableProfileId, () => {
      logger.log(route);
      // postsService.clearAppState();
      getProfileById();
      getPostsByProfileId();
    }, { immediate: true });


    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.profilePosts),
      getOlderPosts,
      getNewerPosts,
      ads: computed(() => AppState.ads),
    };
  },
  components: { PostCard, Ad }
}
</script>

<style lang="scss" scoped>
.profile-page {
  .profile-header {
    position: relative;

    .cover-img {
      height: 30vh;
      width: 100%;
      object-fit: cover;
    }

    .profile-picture {
      cursor: pointer;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      object-fit: cover
    }

    .profile-name {
      margin-top: 8vh;
      font-size: 2rem;
    }

    .profile-bio {
      font-size: 1rem;
      margin: 1rem 0;
    }

    .profile-links {
      i {
        font-size: 1.5rem;
        margin: 0 10px;

        &.text-secondary {
          color: #6c757d; // Bootstrap's secondary text color for greyed out icon
        }
      }
    }
  }

  // .profile-picture {
  //   height: 20vh;
  // }

  // .cover-img {
  //   height: 50vh;
  //   width: 80%;
  //   object-fit: cover;
  // }

  // .fancy-font {
  //   font-family: 'Josefin Sans', sans-serif;
  // 
}
</style>