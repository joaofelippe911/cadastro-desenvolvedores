export interface IListMetaData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface IDeveloper {
  id: number;
  nome: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
  nivel: ILevel;
  idade: number;
}

export interface ICreateDeveloper extends Omit<IDeveloper, "id" | 'nivel' | 'idade'> {
  nivel_id: number;
}

export interface ICreateLevel extends Omit<ILevel, "id" | "quantidade_devs_associados"> {}


export interface ILevel {
  id: number;
  nivel: string;
  quantidade_devs_associados?: number;
}
