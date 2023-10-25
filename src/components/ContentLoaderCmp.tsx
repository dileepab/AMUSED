import React from 'react';
import ContentLoader from 'react-content-loader';

const ContentLoaderCmp: React.FC = () => {
    return (
        <ContentLoader viewBox="0 0 380 550">
            {/* SVG shapes representing loading skeleton */}
            <rect x="0" y="0" rx="5" ry="5" width="380" height="380" />
            <rect x="20" y="400" rx="4" ry="4" width="340" height="40" />
            <rect x="20" y="460" rx="3" ry="3" width="340" height="40" />
        </ContentLoader>
    );
};

export default ContentLoaderCmp;
