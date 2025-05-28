import axios from "axios";
import type { PaginatedList } from "../../types";
import type { ICreateLevel, ILevel } from "../../interfaces";

class LevelService{
  private readonly baseURL = 'http://localhost:3000/niveis';

  async create(level: ICreateLevel): Promise<ILevel> {
    const { data } = await axios.post(this.baseURL, level);

    return data;
  }

  async get(page?: number, signal?: AbortSignal): Promise<PaginatedList<ILevel>> {
    const query = page ? `?page=${page}` : '';

    const { data } = await axios.get(`${this.baseURL}${query}`, { signal });

    return data;
  }

  async findById(id: number, signal: AbortSignal): Promise<ILevel> {
    const { data } = await axios.get(`${this.baseURL}/${id}`, { signal });

    return data;
  }

  async update(id: number, level: ICreateLevel): Promise<ILevel> {
    const { data } = await axios.put(`${this.baseURL}/${id}`, level);

    return data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}`);
  }
}

export default new LevelService();
