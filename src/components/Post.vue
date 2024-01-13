<template>
  
</template>

<script>
import { AppState } from "../AppState";
import { computed, ref, onMounted } from "vue";
import { Post } from "../models/Post";
import { RouterLink } from "vue-router";

export default {
  props: {
    post: { type: Post, required: true },
  },
  setup() {
    return {};
  },
  components: { RouterLink },
};
</script>

<style lang="scss" scoped>
.img {
  height: 30vh;
  object-fit: cover;
}
</style>
