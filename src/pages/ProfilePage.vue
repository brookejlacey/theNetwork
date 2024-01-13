<template>
  <div class="container-fluid">
    <section v-if="profile" class="row">
      <div class="col-12 text-center my-3">
        <img
          class="profile-picture"
          :src="profile.picture"
          :alt="profile.name"
        />
        <div>
          <img
            class="cover-img"
            :src="profile.coverImg"
            :alt="profile.name + ' cover image'"
          />
        </div>
      </div>
      <div class="col-8 ps-5">
        <h1>
          <a
            v-if="profile.github"
            :href="profile.github"
            :title="`Go to ${profile.name}'s github!'`"
            target="_blank"
          >
            <i class="mdi mdi-github"></i>
          </a>
          <!-- make this so that the github is greyed out if not graduated right? -->
          <!-- <span :class="{ 'fancy-font': profile.graduated }">{{ profile.name }}</span> -->
        </h1>
        <p>{{ profile.bio }}</p>
      </div>
      <div class="col-4">
        <h2>Posts: {{ posts.length }}</h2>
      </div>
    </section>
    <section class="row">
      <div v-for="post in posts" :key="post.id" class="col-12 col-md-4 mb-3">
        <PostCard :post="post" />
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
    watch(

      watchableProfileId,

      () => {

        logger.log(route);
        postsService.clearAppState()
        getProfileById();
        // getPostsByProfileId();
      },

      { immediate: true }
    )



    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.profilePosts)
    };
  },
  components: { PostCard }
}
</script>

<style lang="scss" scoped>
.profile-picture {
  height: 20vh;
}

.cover-img {
  height: 50vh;
  width: 80%;
  object-fit: cover;
}

.fancy-font {
  font-family: 'Josefin Sans', sans-serif;
}
</style>
