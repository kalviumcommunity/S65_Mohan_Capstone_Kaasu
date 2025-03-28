import React from 'react'

const Footer = () => {
  return (
    <div>
<footer className="bg-white shadow-sm dark:bg-gray-900 p-3">
    <div className="w-full max-w-screen-xl mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                {/* Logo Image */}
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Kaasu</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Upload</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="text-center block text-sm text-gray-500 sm:text-center dark:text-gray-400">Made ❤️ by <a href="#" className="hover:underline">Mohan</a></span>
    </div>
</footer>


    </div>
  )
}

export default Footer