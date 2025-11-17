import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {

    return (

        <div className="relative mt-16 md:mt-24">
            {/* Banner Images */}
            <img
                src={assets.bottom_banner_image}
                alt="banner"
                className="w-full hidden md:block"
            />
            <img
                src={assets.bottom_banner_image}
                alt="banner"
                className="w-full block md:hidden"
            />

            {/* Content Overlay - Ensure items-start allows content to start from the left */}
            <div className="absolute inset-0 flex flex-col justify-start md:justify-center items-start md:items-end px-4 sm:px-8 md:pr-16 lg:pr-24 pt-12 sm:pt-16 md:pt-0">

                {/* REVISION 1: Define a clear starting point for content on small screens. 
           We use 'w-1/2' or a calculated arbitrary width to ensure it only takes up the right half of the banner space. */}
                <div className="w-11/12 sm:w-8/12 md:w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
                        ml-auto md:ml-0 
                        md:mx-0">
                    {/* - ml-auto: Pushes the block to the right edge of the content overlay (inset-0).
                - md:ml-0: Removes the auto-margin on desktop where we want right-alignment.
                - w-11/12 and sm:w-8/12: Explicitly limits the width on mobile screens to ensure the content doesn't bleed into the left side.
            */}

                    {/* Title - Aligned left on mobile, right on desktop */}
                    <h1 className="text-lg sm:text-xl md:text-3xl font-semibold text-primary mb-6 text-left md:text-right">
                        Why we are the best?
                    </h1>

                    {/* Features List - Aligned left on mobile, right on desktop */}
                    <div className="space-y-5">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                // Left-align the feature block on mobile, right-align on desktop.
                                className="flex flex-col sm:flex-row md:flex-row items-center md:items-start gap-3 sm:gap-4 justify-start md:justify-end"
                            >
                                {/* Text - Left-align text on mobile, right-align on desktop */}
                                <div className="flex-1 text-left md:text-right order-2 md:order-1">
                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500/80 text-xs sm:text-sm md:text-base leading-snug">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Icon */}
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-8 sm:w-9 md:w-11 order-1 md:order-2 flex-shrink-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomBanner