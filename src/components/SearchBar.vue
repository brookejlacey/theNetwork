
<template>
    <div class="search-bar">
        <input v-model="searchTerm" type="text" placeholder="Search Site">
        <button @click="onSearchClick">Search</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            searchTerm: ''
        };
    },
    methods: {
        onSearchClick() {
            this.$emit('search', this.searchTerm);
        }
    }
};
</script>
  