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

// Admin
import AdminLayout from '../Components/Admin/AdminLayout';
import ProtectedRoute from '../Components/Admin/ProtectedRoute';
import Login from '../Pages/Admin/Login';
import Dashboard from '../Pages/Admin/Dashboard';
import AdminProjects from '../Pages/Admin/AdminProjects';
import AdminEducation from '../Pages/Admin/AdminEducation';
import AdminSocials from '../Pages/Admin/AdminSocials';
import AdminCertificates from '../Pages/Admin/AdminCertificates';
import AdminProfile from '../Pages/Admin/AdminProfile';
import AdminMessages from '../Pages/Admin/AdminMessages';
import AdminSeo from '../Pages/Admin/AdminSeo';
import AdminChangePassword from '../Pages/Admin/AdminChangePassword';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            { index: true, Component: Home },
            { path: "/projects", Component: Projects },
            { path: "/project/:id", Component: ProjectDetails },
            { path: "/social", Component: Social },
            { path: "/contact", Component: Contact },
            { path: "/edu-certificates", Component: Education },
        ]
    },
    // Admin routes — outside RootLayout (no portfolio sidebar/navbar)
    {
        path: "/admin/login",
        Component: Login,
    },
    {
        path: "/admin",
        element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
        children: [
            { path: "dashboard", Component: Dashboard },
            { path: "profile", Component: AdminProfile },
            { path: "projects", Component: AdminProjects },
            { path: "education", Component: AdminEducation },
            { path: "certificates", Component: AdminCertificates },
            { path: "socials", Component: AdminSocials },
            { path: "messages", Component: AdminMessages },
            { path: "seo", Component: AdminSeo },
            { path: "change-password", Component: AdminChangePassword },
        ]
    },
]);