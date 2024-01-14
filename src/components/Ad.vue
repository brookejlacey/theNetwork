<template>
    <div class="ad">
        <a :href="ad.linkURL" target="_blank">
            <img :src="ad.square" :alt="ad.title" class="img-fluid">
        </a>
    </div>
</template>

<script>
export default {
    props: {
        ad: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped lang="scss">

.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>
