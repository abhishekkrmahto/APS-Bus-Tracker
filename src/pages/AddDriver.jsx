import React from 'react'
import logo from '../assets/APS_LOGO.png'

const AddDriver = () => {
  return (
    <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    * {
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>

            <section className="flex items-center justify-center py-12 px-4">
                <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">

                    <div className="p-5">
                        <h1 className="text-3xl font-semibold text-gray-900 text-center md:text-start mb-3 tracking-tight">
                            ADD BUS
                        </h1>
                        <p className="text-sm/6 text-gray-600 text-center md:text-start mx-auto md:mx-0 mb-8 leading-relaxed max-w-[400px]">
                            Apex public school
                        </p>

                        <form>
                            <div className="grid grid-cols-2 gap-4 mb-5">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">First name</label>
                                    <input type="text" placeholder="David" className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Last name</label>
                                    <input type="text" placeholder="Andrew" className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />  
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block text-sm text-gray-500 mb-2">Email id</label>
                                <input type="email" placeholder="david@company.com" className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"/>
                            </div>

                            <div className="mb-5">
                                <label className="block text-sm text-gray-500 mb-2">Phone number</label>
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
                                    <select className="px-3 py-3 text-sm outline-none cursor-pointer text-gray-500 bg-white border-r border-gray-300">
                                        <option>US</option>
                                        <option>UK</option>
                                        <option>IN</option>
                                        <option>CA</option>
                                    </select>
                                    <input type="tel" placeholder="+1 342 123-456" className="flex-1 px-3 py-3 text-sm outline-none" />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3.5 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)]" >
                                Send message
                            </button>
                        </form>
                    </div>

                    <div className="rounded-3xl p-10 relative min-h-[420px] w-full max-w-[400px] hidden md:flex flex-col justify-between overflow-hidden">
                        <img src={logo} alt="3D shapes" className="absolute left-[160px] top-[130px] inset-0  object-cover" />
                    </div>
                </div>
            </section>
        </>
  )
}

export default AddDriver
