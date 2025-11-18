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

            <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
                <div className="w-11/12 sm:w-8/12 md:w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 
                        ml-auto md:ml-0 
                        md:mx-0">
                    <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
                        Why we are the best?
                    </h1>
                    <div className="space-y-5">
                        {features.map((feature, index) => (
                            <div key={index} className="flex  items-center gap-4 mt-2">
                                <img
                                    src={feature.icon}
                                    alt={feature.title}
                                    className=" w-9 md:w-11"/>
                                {/* Text */}
                                <div className=''>
                                    <h3 className="text-lg md:text-xl font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500/80 text-xs md:text-sm">
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