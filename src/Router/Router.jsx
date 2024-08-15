import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
const Router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
    },
  ]);
  

export default Router;