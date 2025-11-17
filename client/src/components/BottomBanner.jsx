import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {

    return (
        <div className="relative mt-10">
            {/* Banner */}
            <img
                src={assets.bottom_banner_image}
                alt="banner"
                className="w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-16">
                <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">

                    {/* Title */}
                    <h1 className="text-xl md:text-3xl font-semibold text-primary mb-6 text-center md:text-right">
                        Why we are the best?
                    </h1>

                    {/* Features */}
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 md:gap-6"
                            >
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className="w-10 md:w-12"
                                />

                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm md:text-base">
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