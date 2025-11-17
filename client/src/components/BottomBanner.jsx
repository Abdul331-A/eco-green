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

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-start md:justify-center items-center md:items-end px-4 sm:px-8 md:pr-16 lg:pr-24 pt-12 sm:pt-16 md:pt-0">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                    {/* Title */}
                    <h1 className="text-lg sm:text-xl md:text-3xl font-semibold text-primary mb-6 text-center md:text-right">
                        Why we are the best?
                    </h1>

                    {/* Features List */}
                    <div className="space-y-5">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row md:flex-row items-center md:items-start gap-3 sm:gap-4 text-center md:text-right"
                            >
                                {/* Icon */}
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-8 sm:w-9 md:w-11"
                                />

                                {/* Text */}
                                <div className="flex-1">
                                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500/80 text-xs sm:text-sm md:text-base leading-snug">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BottomBanner