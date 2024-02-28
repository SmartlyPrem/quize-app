import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './Components/Main';
import MainApp from './Components/MainApp';
import Listing from './Components/Listing'
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Create from "./Components/Create";
import Play from "./Components/Play";
import Test from "./Components/Test";

function App() {
  const routs = createBrowserRouter(
    [
      {
        path: '/',
        element: <Main/>,
        children: [
          {
            path: '',
            element: <MainApp/>,
          },
          {
            path: 'create-quiz',
            element: <Create/>
          },
          {
            path: 'listing',
            element: <Listing/>
          },
          {
            path: 'login',
            element: <Login/>
          },
          {
            path: 'signup',
            element: <Signup/>
          },
          {
            path: "play",
            element: <Play/>
          },
          {
            path: "test",
            element: <Test/>
          }
        ]
      }
    ]
  )
  return <RouterProvider router={routs}/>
}

export default App;

