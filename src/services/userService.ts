import { User, ApiResponse } from '../types';
import { mockUsers } from '../data/users';
import { QueryParams, simulateDelay } from './apiClient';

/**
 * User Service - Ready for Laravel `Route::apiResource('users', UserController::class);`
 */
class UserService {
  private users: User[] = [...mockUsers];

  async getUsers(params?: QueryParams): Promise<ApiResponse<User[]>> {
    await simulateDelay(150);
    let filtered = [...this.users];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
      );
    }

    if (params?.filters?.status) {
      filtered = filtered.filter(u => u.status === params.filters?.status);
    }
    if (params?.filters?.role) {
      filtered = filtered.filter(u => u.role === params.filters?.role);
    }

    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return {
      data: paginated,
      pagination: { page, perPage, total, totalPages }
    };
  }

  async getUserById(id: string): Promise<User | null> {
    await simulateDelay(100);
    return this.users.find(u => u.id === id) || null;
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> {
    await simulateDelay(250);
    const newUser: User = {
      ...data,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
    };
    this.users.unshift(newUser);
    return newUser;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await simulateDelay(200);
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async deleteUser(id: string): Promise<boolean> {
    await simulateDelay(200);
    this.users = this.users.filter(u => u.id !== id);
    return true;
  }
}

export const userService = new UserService();
