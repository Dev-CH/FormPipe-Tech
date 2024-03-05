import Client from '../Client/client';
import { ApiResponse } from '@/api/types/ApiResponse';
import { UpdateUserRequest, User } from '@/api/types';

interface UserFilters {
    [name: string]: any,
}

class UserController {
    readonly #client: Client;

    constructor(client: Client) {
        this.#client = client;
    }

    getAll(filters: UserFilters): Promise<ApiResponse<User[]>> {
        return new Promise((resolve) => {
            this.#client.request<User[]>({
                method: 'GET',
                url: '/users',
                params: { ...filters },
            }).then((response) => {
                resolve({
                    total: parseInt(response.headers['x-total-count'] as string, 10),
                    data: response.data,
                });
            });
        });
    }

    get(id: string): Promise<ApiResponse<User>> {
        return new Promise((resolve) => {
           this.#client.request<User[]>({
               method: 'GET',
               url: '/users/',
               params: { id },
           }).then((response) => {
               resolve({
                   total: 1,
                   data: response.data[0],
               });
           });
        });
    }

    update(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
        return new Promise((resolve) => {
           this.#client.request<User>({
               method: 'PATCH',
               url: `/users/${id}`,
               data: { ...data },
           }).then((response) => {
               resolve({
                   total: 1,
                   data: response.data,
               });
           });
        });
    }
}

export default UserController;
