<template>
    <form @submit.prevent="submitSearch">
        <input type="text" v-model="searchQuery" placeholder="Search for posts...">
        <button type="submit">Search</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService';

export default {
    setup() {
        const searchQuery = ref('');

        const submitSearch = async () => {
            if (searchQuery.value.trim()) {
                await postsService.searchPosts(searchQuery.value);
            }
        };

        return {
            searchQuery,
            submitSearch,
        };
    },
};
</script>
