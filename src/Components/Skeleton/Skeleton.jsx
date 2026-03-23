// Reusable shimmer skeleton components

export const SkeletonCard = ({ className = '' }) => (
    <div className={`animate-pulse bg-base-200/60 rounded-2xl ${className}`} />
);

export const SkeletonText = ({ className = '' }) => (
    <div className={`animate-pulse bg-base-200/60 rounded-lg h-4 ${className}`} />
);

// Project card skeleton
export const ProjectCardSkeleton = () => (
    <div className="bg-base-200/50 border border-base-300 rounded-[2rem] overflow-hidden animate-pulse">
        <div className="h-48 bg-base-300/50" />
        <div className="p-6 space-y-3">
            <div className="h-5 bg-base-300/50 rounded-lg w-3/4" />
            <div className="h-4 bg-base-300/50 rounded-lg w-full" />
            <div className="h-4 bg-base-300/50 rounded-lg w-5/6" />
            <div className="flex gap-2 mt-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-base-300/50 rounded-full" />
                ))}
            </div>
        </div>
    </div>
);

// Education card skeleton
export const EducationCardSkeleton = () => (
    <div className="bg-base-200/50 border border-base-300 rounded-[2rem] p-6 animate-pulse space-y-3">
        <div className="h-5 bg-base-300/50 rounded-lg w-2/3" />
        <div className="h-4 bg-base-300/50 rounded-lg w-1/2" />
        <div className="h-4 bg-base-300/50 rounded-lg w-1/3" />
    </div>
);

// Certificate skeleton (5:4 ratio)
export const CertificateSkeleton = () => (
    <div className="bg-base-200/50 border border-base-300 rounded-[2rem] overflow-hidden animate-pulse">
        <div className="w-full" style={{ paddingBottom: '80%', position: 'relative' }}>
            <div className="absolute inset-0 bg-base-300/50" />
        </div>
        <div className="p-4 space-y-2">
            <div className="h-4 bg-base-300/50 rounded-lg w-3/4" />
            <div className="h-3 bg-base-300/50 rounded-lg w-1/2" />
        </div>
    </div>
);

// Social link skeleton
export const SocialSkeleton = () => (
    <div className="bg-base-200/50 border border-base-300 rounded-[2rem] p-6 animate-pulse flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-base-300/50 shrink-0" />
        <div className="space-y-2 flex-1">
            <div className="h-4 bg-base-300/50 rounded-lg w-1/3" />
            <div className="h-3 bg-base-300/50 rounded-lg w-1/2" />
        </div>
    </div>
);

// About page skeleton
export const AboutSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-base-200/60 rounded-lg w-48" />
        <div className="h-1.5 bg-base-200/60 rounded-full w-20" />
        <div className="bg-base-200/50 rounded-[2.5rem] p-8 space-y-4 mt-6">
            <div className="h-5 bg-base-300/50 rounded-lg w-1/3" />
            <div className="h-4 bg-base-300/50 rounded-lg w-full" />
            <div className="h-4 bg-base-300/50 rounded-lg w-5/6" />
            <div className="h-4 bg-base-300/50 rounded-lg w-4/6" />
        </div>
    </div>
);
