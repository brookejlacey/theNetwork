<template>
  <div class="container-fluid">
    <section v-if="profile" class="row">
      <div class="col-12 text-center my-3">
        
        <div class="cover-image-container">
          <img class="cover-img" :src="profile.coverImg" :alt="profile.name + ' cover image'">
        </div>
       
        <img class="profile-picture rounded-circle" :src="profile.picture" :alt="profile.name">
        
        <h1>
          <span>{{ profile.name }}</span>
        </h1>
        
        <div>
          <a v-if="profile.github" :href="profile.github" :title="`Go to ${profile.name}'s GitHub`" target="_blank">
            <i class="mdi mdi-github" :class="{ 'github-icon': true, 'non-graduated': !profile.graduated }"></i>
          </a>
             </div>
        
        <p>{{ profile.bio }}</p>
      </div>
     
      <div class="col-12">
        <h2>Posts: {{ posts.length }}</h2>
        <section class="row">
          <div v-for="post in posts" :key="post.id" class="col-12 col-md-4 mb-3">
            <PostCard :post="post" />
          </div>
        </section>
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
    watch(watchableProfileId, () => {
      logger.log(route);
      postsService.clearAppState();
      getProfileById();
      getPostsByProfileId();
    }, { immediate: true });


    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.profilePosts)
    };
  },
  components: { PostCard }
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
      height: 15vh;
      width: 15vh;
      object-fit: cover;
      border: 3px solid white;
      position: absolute;
      bottom: -7.5vh; /* Half of the picture's height to overlap */
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
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
