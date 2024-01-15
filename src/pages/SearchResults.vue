<template>
    <div class="search-results-page">
        <div class="people-results">
            <h2>People</h2>
            <!-- Display profile search results -->
            <ProfileCard v-for="profile in profileSearchResults" :key="profile.id" :profile="profile" />
        </div>
        <div class="posts-results">
            <h2>Posts</h2>
            <!-- Display posts search results -->
            <PostCard v-for="post in postSearchResults" :key="post.id" :post="post" />
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from './components/PostCard.vue';
import ProfileCard from './components/ProfileCard.vue';
import { searchService } from './services/SearchService';

export default {

    components: {
        PostCard,
        ProfileCard
    },
    setup() {
        const route = useRoute();
        const profileSearchResults = ref([]);
        const postSearchResults = ref([]);
        const fetchSearchResults = async () => {
            const query = route.query.q;
            if (query) {

                const profileResults = await searchService.searchProfiles(query);
                const postResults = await searchService.searchPosts(query);

                profileSearchResults.value = profileResults;
                postSearchResults.value = postResults;
            }
        };

        onMounted(fetchSearchResults);

        return {
            profileSearchResults,
            postSearchResults
        };
    }
};
</script>

<style scoped></style>