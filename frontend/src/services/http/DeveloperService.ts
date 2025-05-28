import axios from "axios";
import type { PaginatedList } from "../../types";
import type { ICreateDeveloper, IDeveloper } from "../../interfaces";


class DeveloperService{
  private readonly baseURL = 'http://localhost:3000/desenvolvedores';

  async create(developer: ICreateDeveloper): Promise<IDeveloper> {
    const { data } = await axios.post(this.baseURL, developer);

    return data;
  }

  async get(page: number, signal?: AbortSignal): Promise<PaginatedList<IDeveloper>> {
    const { data } = await axios.get(`${this.baseURL}?page=${page}`, { signal });

    return data;
  }

  async findById(id: number, signal: AbortSignal): Promise<IDeveloper> {
    const { data } = await axios.get(`${this.baseURL}/${id}`, { signal });

    return data;
  }

  async update(id: number, developer: ICreateDeveloper): Promise<IDeveloper> {
    const { data } = await axios.put(`${this.baseURL}/${id}`, developer);

    return data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.baseURL}/${id}`);
  }
}

export default new DeveloperService();
