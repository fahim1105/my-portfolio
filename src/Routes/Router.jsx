import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../Layout/RootLayout';
import Home from '../Components/Home/Home';
import Projects from '../Pages/Projects/Projects';
import Social from '../Pages/Social/Social';
import Contact from '../Pages/Contact/Contact';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import ProjectDetails from '../Pages/ProjectDetails/ProjectDetails';
import Education from '../Pages/Education/Education';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/projects",
                Component: Projects
            },
            {
                path: "/project/:id",
                Component: ProjectDetails
            },
            {
                path: "/social",
                Component: Social
            },
            {
                path: "/contact",
                Component: Contact
            },
            {
                path:"/education",
                Component:Education
            }
        ]
    },
]);