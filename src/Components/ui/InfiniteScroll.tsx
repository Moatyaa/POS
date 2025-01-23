import React from 'react';

interface InfiniteScrollComponentProps {
    data: any[];
    fetchMoreData: () => void;
    isLoading: boolean;
    hasMore: boolean;
    renderItem: (item: any) => React.ReactNode;
}

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({
                                                                             data,
                                                                             fetchMoreData,
                                                                             isLoading,
                                                                             hasMore,
                                                                             renderItem
                                                                         }) => {

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom = e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.clientHeight;
        if (bottom && !isLoading && hasMore) {
            fetchMoreData();
        }
    };

    return (
        <div
            className="scroll-container"
            style={{ height: '400px', overflowY: 'auto' }}
            onScroll={handleScroll}
        >
            {data.map((item, index) => (
                <div key={index} className="item">
                    {renderItem(item)}
                </div>
            ))}

            {isLoading && (
                <div className="loading-spinner">
                    <svg
                        className="animate-spin h-8 w-8 text-[#2d71f8] text-2xl"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 12a8 8 0 0116 0"
                        />
                    </svg>
                </div>
            )}

            {!hasMore && (
                <div className="no-more-data">
                    <p>✨ You’ve reached the end! ✨</p>
                </div>
            )}
        </div>
    );
};

export default InfiniteScrollComponent;
