<template>
  <div class="col-3">
    <!-- image of something here -->
  </div>
</template>

<script>
import { onMounted, popScopeId } from "vue";
import Pop from "../utils/Pop";

export default {
  setup() {
    const route = useRoute();
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
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
