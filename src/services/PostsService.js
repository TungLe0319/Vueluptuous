import { AppState } from '../AppState.js';
import { Post } from '../models/Post.js';
import { api, postApi } from './AxiosService.js';
import {LikeIds} from '../models/LikeIds.js'
import { Account } from "../models/Account.js";
class PostsService {
  async getPostsBySearchTerm(term, page = 1) {
    const res = await api.get('/api/posts', {
      params: {
        query: term,
        page,
      },
    });
    // console.log(res.data);
    (AppState.posts = res.data.posts.map((p) => new Post(p))),
      (AppState.page = res.data.page);

    AppState.lastPage = res.data.total_pages;
    AppState.term = term;
  }
  async getPosts(page) {
    const res = await postApi.get(page);
    // console.log(res.data);
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

  async getPostsByCreatorId(creatorId) {
    AppState.posts = [];
    const res = await api.get(`api/profiles/${creatorId}/posts`, {
      params: creatorId,
    });
    // console.log(res.data);
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.nextPage = res.data.older;
    AppState.previousPage = res.data.newer;
  }

  async createPost(formData) {
    const res = await api.post('api/posts', formData);
    AppState.posts = [new Post(res.data), ...AppState.posts];
    // AppState.posts.push(new Post(res.data));
  }

  async deletePost(id) {
    const res = await api.delete(`/api/posts/${id}`);
    AppState.posts = AppState.posts.filter((p) => p.id != id);
  }

  async likePost(id) {

    const res = await api.post(`/api/posts/${id}/like`);
    // console.log(res.data);
    let post = AppState.posts.findIndex((p) => p.id == id);
    let post1 = AppState.posts.find(p => p.id ==id)
    // console.log(post1);
    console.log(post1);
    AppState.posts.splice(post, 1, new Post(res.data));
    post1.thumbUp = !post1.thumbUp

console.log(post1);
  //   AppState.likesAccounts = res.data.likes.map(l => new Account(l))
  //  console.log(AppState.likesAccounts,'testintg');
  //  let myLike = AppState.likesAccounts.find(i => i.id == AppState.account.id)
  //  AppState.myLike = new Account(myLike)
   
  //  console.log(AppState.myLike,'test23');

  // AppState.likesAccounts = res.data.likes
  //   let myLike = AppState.likesAccounts.find((i) => i.id == AppState.account.id);
  //  AppState.myLike = new Account(myLike);
  //  console.log(AppState.myLike);


  }

  async toggleLike(){
    
AppState.posts.forEach(p => {
  if (p.likes.id == AppState.account.id) {
    p.thumbsUp = true
    console.log(p);
  }
})
  }
}
export const postService = new PostsService();
