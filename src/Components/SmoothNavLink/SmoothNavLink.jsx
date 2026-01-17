import { NavLink, useNavigate, useLocation } from 'react-router';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const SmoothNavLink = ({ to, children, className, onClick, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { scrollToTop } = useSmoothScroll();

    const handleClick = (e) => {
        // Call original onClick if provided
        if (onClick) {
            onClick(e);
        }

        // If navigating to the same page, just scroll to top
        if (location.pathname === to) {
            e.preventDefault();
            scrollToTop();
        } else {
            // For different pages, let React Router handle it
            // The SmoothPageTransition component will handle scrolling to top
        }
    };

    return (
        <NavLink
            to={to}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </NavLink>
    );
};

export default SmoothNavLink;