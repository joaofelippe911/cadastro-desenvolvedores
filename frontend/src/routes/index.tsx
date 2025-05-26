import { useRoutes } from "react-router-dom";
import { ListDevelopers } from "../pages/ListDevelopers";
import { Layout } from "../components/Layout";
import { ListLevels } from "../pages/ListLevels";


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
          path: '/niveis',
          Component: ListLevels
        }
    ]
    }
  ])

  return routes;
}
