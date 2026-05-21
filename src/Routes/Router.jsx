import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../Layout/RootLayout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

// Eagerly load the home page (first thing user sees)
import Home from '../Components/Home/Home';

// Lazy load all other public pages — splits them into separate chunks
const Projects = lazy(() => import('../Pages/Projects/Projects'));
const Social = lazy(() => import('../Pages/Social/Social'));
const Contact = lazy(() => import('../Pages/Contact/Contact'));
const ProjectDetails = lazy(() => import('../Pages/ProjectDetails/ProjectDetails'));
const Education = lazy(() => import('../Pages/Education/Education'));

// Lazy load all admin pages — users rarely visit these
const AdminLayout = lazy(() => import('../Components/Admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('../Components/Admin/ProtectedRoute'));
const Login = lazy(() => import('../Pages/Admin/Login'));
const Dashboard = lazy(() => import('../Pages/Admin/Dashboard'));
const AdminProjects = lazy(() => import('../Pages/Admin/AdminProjects'));
const AdminEducation = lazy(() => import('../Pages/Admin/AdminEducation'));
const AdminSocials = lazy(() => import('../Pages/Admin/AdminSocials'));
const AdminCertificates = lazy(() => import('../Pages/Admin/AdminCertificates'));
const AdminProfile = lazy(() => import('../Pages/Admin/AdminProfile'));
const AdminMessages = lazy(() => import('../Pages/Admin/AdminMessages'));
const AdminSeo = lazy(() => import('../Pages/Admin/AdminSeo'));
const AdminChangePassword = lazy(() => import('../Pages/Admin/AdminChangePassword'));

// Minimal fallback — page transition handles the visual
const PageFallback = () => (
    <div className="flex items-center justify-center h-40">
        <span className="loading loading-spinner loading-md text-primary"></span>
    </div>
);

const withSuspense = (Component) => (
    <Suspense fallback={<PageFallback />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            { index: true, Component: Home },
            { path: "/projects",         element: withSuspense(Projects) },
            { path: "/project/:id",      element: withSuspense(ProjectDetails) },
            { path: "/social",           element: withSuspense(Social) },
            { path: "/contact",          element: withSuspense(Contact) },
            { path: "/edu-certificates", element: withSuspense(Education) },
        ]
    },
    // Admin routes — outside RootLayout (no portfolio sidebar/navbar)
    {
        path: "/admin/login",
        element: withSuspense(Login),
    },
    {
        path: "/admin",
        element: (
            <Suspense fallback={<PageFallback />}>
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            </Suspense>
        ),
        children: [
            { path: "dashboard",       element: withSuspense(Dashboard) },
            { path: "profile",         element: withSuspense(AdminProfile) },
            { path: "projects",        element: withSuspense(AdminProjects) },
            { path: "education",       element: withSuspense(AdminEducation) },
            { path: "certificates",    element: withSuspense(AdminCertificates) },
            { path: "socials",         element: withSuspense(AdminSocials) },
            { path: "messages",        element: withSuspense(AdminMessages) },
            { path: "seo",             element: withSuspense(AdminSeo) },
            { path: "change-password", element: withSuspense(AdminChangePassword) },
        ]
    },
]);
