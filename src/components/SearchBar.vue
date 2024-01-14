<template>
    <form @submit.prevent="submitSearch">
        <input type="text" v-model="searchQuery" placeholder="Search...">
        <button type="submit">Search</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const searchQuery = ref('');

        const submitSearch = () => {
            if (searchQuery.value.trim()) {
                router.push({ name: 'SearchResults', query: { q: searchQuery.value } });
            }
        };

        return {
            searchQuery,
            submitSearch,
        };
    },
};
</script>
