import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {

    return (

        <div className="relative mt-16">
            {/* Banner Images */}
            <img
                src={assets.bottom_banner_image}
                alt="banner"
                className="w-full hidden md:block"
            />
            <img
                src={assets.bottom_banner_image_sm}
                alt="banner"
                className="w-full block md:hidden"
            />

            <div className="absolute inset-0 flex flex-col justify-start items-center md:items-end md:justify-center pt-16 md:pt-0 px-4 sm:px-8 md:pr-16 lg:pr-24 sm:pt-16">
                <div className="w-11/12 sm:w-8/12 md:w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
                        ml-auto md:ml-0 
                        md:mx-0">
                    <h1 className="text-lg sm:text-xl md:text-3xl font-semibold text-primary mb-6 text-left md:text-right">
                        Why we are the best?
                    </h1>
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