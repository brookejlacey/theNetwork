import { reactive } from "vue";
import { Post } from "./models/Post.js";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {Post} */
  posts: [],
  // /** @type {Post} */
  // olderPosts: null,
  // /** @type {Post} */
  // newerPosts: null,
  /** @type {Post} */
  profilePosts: {},
  

  
  /** @type {import('./models/Profile.js').Profile | null} */
  activeProfile: null,

  currentPage: 1,
  totalPages: 1,
  searchedTerm: '',

    /** @type {import('./models/Ad.js').Ad[]} */
  ads: [],

})
