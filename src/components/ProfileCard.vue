<template>
    <div class="profile-card">
        <div class="card mb-3">
            <div class="card-body">
                <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
                    <img class="profile-picture" :src="profile.picture" alt="Profile image" />
                </router-link>
                <h5 class="card-title">{{ profile.name }}</h5>
                <p class="card-text">
                    <small class="text-muted">{{ profile.graduated ? 'Alumni' : 'Current Student' }} - {{
                        graduationDate(profile.graduated) }}</small>
                </p>
            </div>
        </div>

    </div>
</template>
<script>
import { Profile } from "../models/Profile";
import { RouterLink } from "vue-router";

export default {
    props: {
        profile: { type: Profile, required: true },
    },
    methods: {
        graduationDate(graduated) {
            const date = new Date(graduated);
            return date.toLocaleDateString();
        }
    },
    components: { RouterLink },
};
</script>
<style lang="scss" scoped>
.profile-picture {
    cursor: pointer;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-bottom: 1rem;
}
</style>
  