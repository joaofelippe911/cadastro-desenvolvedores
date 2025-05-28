import { useRoutes } from "react-router-dom";
import { ListDevelopers } from "../pages/ListDevelopers";
import { Layout } from "../components/Layout";
import { ListLevels } from "../pages/ListLevels";
import { CreateDeveloper } from "../pages/CreateDeveloper";
import { UpdateDeveloper } from "../pages/UpdateDeveloper";
import { CreateLevel } from "../pages/CreateLevel";
import { UpdateLevel } from "../pages/UpdateLevel";


export function Router() {
  const routes = useRoutes([
    {
      path: '/',
      Component: Layout,
      children: [
        {
          path: '/',
          Component: ListDevelopers
        },
        {
          path: '/cadastrar',
          Component: CreateDeveloper
        },
        {
          path: '/editar/:id',
          Component: UpdateDeveloper
        },
        {
          path: '/niveis',
          Component: ListLevels
        },
        {
          path: '/niveis/cadastrar',
          Component: CreateLevel
        },
        {
          path: '/niveis/editar/:id',
          Component: UpdateLevel
        },
    ]
    }
  ])

  return routes;
}
