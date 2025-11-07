import api from './api';
import { User, Post, PaginatedResponse, ApiResponse } from '../types';

export const usersService = {
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getUser(id: string): Promise<ApiResponse<{ user: User }>> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async getUserPosts(id: string, page = 1, limit = 10): Promise<PaginatedResponse<Post>> {
    const response = await api.get(`/users/${id}/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  async toggleFollow(id: string): Promise<ApiResponse<{ isFollowing: boolean; followerCount: number }>> {
    const response = await api.post(`/users/${id}/follow`);
    return response.data;
  },
};
