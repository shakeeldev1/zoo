import React from 'react';
import ostrich from '../../assets/commonimages/ostrich.jpeg'
const Header = () => {
    return (
        <div>
            <div className='relative w-full h-[300px] sm:h-[400px] md:h-[600px]'>
                <img
                    src={ostrich}
                    alt="Zoo Background"
                    className='w-full h-full object-cover'
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl  font-bold leading-snug">
                        Welcome to <span className='text-green-600'>Wild Zoo</span>
                    </h1>
                    <p className="text-base sm:text-2xl md:text-2xl lg:text-3xl mt-2 sm:mt-4">
                        Explore & Shop for Wildlife Adventures
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Header;
