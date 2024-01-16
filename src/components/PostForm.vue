<template>
    <div v-if="account.id" class="container my-4">
        <form @submit.prevent="createPost" class="post-form bg-white rounded shadow p-3">
            <div class="mb-3">
                <input v-model="postData.body" class="form-control" type="text" placeholder="Share what's happening"
                    required />
            </div>
            <div class="mb-3">
          <label for="post-picture">Photo/Video</label>
          <input v-model="postData.imgUrl" class="form-control" type="url"  required name="post-picture" id="post-picture">
        </div>
            <div>
                <button type="submit" class="btn btn-primary float-end">
                    Post
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../services/AxiosService';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';

export default {
    setup() {
        const postData = ref({ body: '' });

        async function createPost() {
            try {
                const response = await api.post('api/posts', postData.value);
                AppState.posts.unshift(response.data);
                Pop.success('Post created!');
                postData.value.body = ''; // Reset the form
            } catch (error) {
                Pop.error(error.message);
            }
        }

        return {
            postData,
            account: AppState.account,
            createPost,
        };
    },
};
</script>

<style scoped>
.post-form {
    display: flex;
    flex-direction: column;
}

.post-form input {
    margin-bottom: 10px;
}

.post-form .btn-light {
    margin-right: 10px;
}
</style>
