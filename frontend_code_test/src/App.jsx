

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from './pages/List.page';
import EditPage from './pages/Edit.page';
import CreatePage from "./pages/Create.page";

function App() {
 

   const router = createBrowserRouter([
     {
       path: "/",
       element: <ListPage></ListPage>,
       id: "root",
     },
     {
       path: "/create",
       element: <CreatePage></CreatePage>,
     },
     {
       path: "/edit/:idx",
       element: <EditPage></EditPage>,
     },
   ]);

   return <RouterProvider router={router} />;
}

export default App
