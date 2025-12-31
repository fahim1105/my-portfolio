import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../src/Layout/RootLayout';
import ErrorPage from '../src/Pages/ErrorPage/ErrorPage';
import Home from '../src/Components/Home/Home';
import Projects from '../src/Pages/Projects/Projects';
import Social from '../src/Pages/Social/Social';
import Contact from '../src/Pages/Contact/Contact';

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:"/projects",
            Component:Projects
        },
        {
            path:"/social",
            Component:Social
        },
        {
            path:"/contact",
            Component:Contact
        }
    ]
  },
]);