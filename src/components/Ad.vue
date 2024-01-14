<template>
    <div class="ad">
        <a :href="ad.linkURL" target="_blank">
            <img :src="ad.square" :alt="ad.title" class="img-fluid">
        </a>
    </div>
</template>

<script>
import { Ad } from "../models/Ad";
import { RouterLink } from "vue-router";

export default {
    props: {
        ad: { type: Ad, required: true },
    },
    setup() {
        return {};
    },
    components: { RouterLink },
};
</script>

<style scoped lang="scss">

.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>
