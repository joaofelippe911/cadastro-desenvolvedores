import type { IListMetaData } from "../interfaces";

export type PaginatedList<T> = {
  data: T[];
  meta: IListMetaData;
}
