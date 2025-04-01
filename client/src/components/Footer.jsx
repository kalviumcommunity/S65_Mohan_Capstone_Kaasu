import React from 'react'

const Footer = () => {
  return (
    <div>
<footer className="bg-white shadow-smp-3">
    <div className="w-full max-w-screen-xl mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                {/* Logo Image */}
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kaasu</span>
            </a>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="text-center font-bold block text-sm text-black sm:text-center dark:text-black">Made ❤️ by <a href="#" className="hover:underline">Mohan</a></span>
    </div>
</footer>


    </div>
  )
}

export default Footer