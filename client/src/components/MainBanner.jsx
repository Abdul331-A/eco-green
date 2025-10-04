import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative">
  {/* Background Images */}
  <img
    src={assets.main_banner_bg}
    alt="banner"
    className="w-full hidden md:block"
  />
  <img
    src={assets.main_banner_bg_sm}
    alt="banner"
    className="w-full block md:hidden"
  />

  {/* Content Overlay */}
  <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-16 md:pb-0 px-4 md:pl-16 lg:pl-24">
    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl leading-snug lg:leading-tight">
      Freshness you can trust, savings you will love!
    </h1>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 font-medium">
      <Link
        to={"/product"}
        className="group flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary hover:bg-primary-dull transition rounded-lg text-white cursor-pointer text-sm sm:text-base"
      >
        Shop now
        <img
          className="transition group-hover:translate-x-1 md:hidden"
          src={assets.white_arrow_icon}
          alt=""
        />
      </Link>

      <Link
        to={"/product"}
        className="group hidden md:flex items-center gap-2 px-8 py-3 cursor-pointer text-base"
      >
        Explore deals
        <img
          className="transition group-hover:translate-x-2"
          src={assets.black_arrow_icon}
          alt=""
        />
      </Link>
    </div>
  </div>
</div>

  )
}

export default MainBanner
