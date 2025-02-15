import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../public/animations/lottie.json'; // Path to your Lottie JSON file

const LottieAnimation = () => {
    const defaultOptions = {
        loop: true, // Set to true if you want it to loop
        autoplay: true, // Set to true to autoplay the animation
        animationData: animationData, // Lottie JSON file
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className='absolute -top-[30px] -left-[30px]'>
            <Lottie options={defaultOptions} height={120} width={120} />
        </div>
    );
};

export default LottieAnimation;
