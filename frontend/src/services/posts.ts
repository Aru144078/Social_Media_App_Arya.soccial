import api from './api';
import { Post, Comment, CreatePostData, PaginatedResponse, ApiResponse } from '../types';

export const postsService = {
  async getPosts(page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getPost(id: string): Promise<ApiResponse<{ post: Post }>> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<ApiResponse<{ post: Post }>> {
    const formData = new FormData();
    formData.append('content', data.content);
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updatePost(id: string, content: string): Promise<ApiResponse<{ post: Post }>> {
    const response = await api.put(`/posts/${id}`, { content });
    return response.data;
  },

  async deletePost(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  async toggleLike(id: string): Promise<ApiResponse<{ isLiked: boolean; likeCount: number }>> {
    const response = await api.post(`/posts/${id}/like`);
    return response.data;
  },

  async getComments(postId: string, page = 1, limit = 10): Promise<PaginatedResponse<Comment>> {
    const response = await api.get(`/posts/${postId}/comments?page=${page}&limit=${limit}`);
    return response.data;
  },

  async createComment(postId: string, content: string): Promise<ApiResponse<{ comment: Comment }>> {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  },

  async deleteComment(commentId: string): Promise<ApiResponse<void>> {
    const response = await api.delete(`/posts/comments/${commentId}`);
    return response.data;
  },
};
