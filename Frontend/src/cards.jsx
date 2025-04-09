import React, { useRef, useEffect } from 'react';

function HorizontalCardSlider({ cards }) {
    // Use a ref to get access to the scrollable container
    const sliderRef = useRef(null);

    // Scroll right by a fixed amount (adjust the value as needed)
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Scroll left by a fixed amount
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Optional: Listen to arrow keys to control scrolling
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                scrollRight();
            } else if (e.key === 'ArrowLeft') {
                scrollLeft();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className='flex flex-row '>
                {cards.map((podcast) => (
                    <div className="mx-1 lg:mx-2" onClick={()=>{
                        window.open(`https://open.spotify.com/show/${podcast.id}`, '_blank');
                    }} style={{ cursor: "pointer" }}>
                        <div className=" p-2 lg:p-3 w-[180px] h-[290px] lg:w-[250px] lg:h-[355px] rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800">
                            <div className="h-[156px] lg:h-[218px] bg-cover rounded-lg"
                                style={{ backgroundImage: `url('${podcast.images[0]?.url}')` }}
                            />
                            <div className=" pt-2 pb-2 lg:pt-4 lg:pb-4">
                                <h5 className="text-start font-semibold tracking-tight text-black dark:text-white">
                                    <TruncateText text={podcast.name} maxlength={25} />
                                </h5>
                                    <span className=" text-sm text-gray-600 dark:text-gray-400">
                                        <TruncateText text={podcast.publisher} maxlength={20} />
                                    </span>
                                <button className="lg:mt-4 mt-3 inline-flex items-center px-2 py-[4px]  lg:px-3 lg:py-[6px] text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600  dark:bg-green-500 dark:hover:bg-green-600">Listen on Spotify </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    function TruncateText({ text, maxlength }) {
        const displaytext = text.length > maxlength ? text.substring(0, maxlength) + "..." : text;
        return (
            <p>
                {displaytext}
            </p>
        )
    }
}

export default HorizontalCardSlider;
