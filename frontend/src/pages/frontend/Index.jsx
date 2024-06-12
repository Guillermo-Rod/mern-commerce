import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ProductCard from "../../components/frontend/ProductCard";
import Footer from "../../components/frontend/Footer";
import Carousel from "../../components/frontend/Carousel";

export default function Index() {

    const getProducts = () => {

        return [
            {
                name: "Bebida uno",
                price: "120",
                old_price: "150",
                image: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
                name: "Bebida dos",
                price: "120",
                old_price: "150",
                image: "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
                name: "Bebida tres",
                price: "120",
                old_price: "150",
                image: "https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
                name: "Bebida cuatro",
                price: "120",
                old_price: "150",
                image: "https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
                name: "Bebida cinco",
                price: "120",
                old_price: "150",
                image: "https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
            {
                name: "Bebida seis",
                price: "120",
                old_price: "150",
                image: "https://images.unsplash.com/photo-1649261191606-cb2496e97eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            },
        ];
    }

    return (
        <div>
            <main className="dark:bg-gray-800 bg-white relative min-h-screen">
                <header className="h-24 sm:h-32 flex items-center z-30 w-full">
                    <div className="container mx-auto px-6 flex items-center justify-between">
                        <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
                            Watch.ME
                        </div>
                        <div className="flex items-center">
                            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
                                <a href="#" className="py-2 px-6 flex">
                                    Home
                                </a>
                                <a href="#" className="py-2 px-6 flex">
                                    Watch
                                </a>
                                <a href="#" className="py-2 px-6 flex">
                                    Product
                                </a>
                                <a href="#" className="py-2 px-6 flex">
                                    Contact
                                </a>
                                <a href="#" className="py-2 px-6 flex">
                                    Carrer
                                </a>
                            </nav>
                            <button className="lg:hidden flex flex-col ml-4">
                                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                                </span>
                                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                                </span>
                                <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                                </span>
                            </button>
                        </div>
                    </div>
                </header>
                <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
                    <div className="container mx-auto px-6 flex relative py-16">
                        <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                            </span>
                            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                                Be on
                                <span className="text-5xl sm:text-7xl">
                                    Time
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
                                Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                            </p>
                            <div className="flex mt-8">
                                <a href="#" className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                                    Get started
                                </a>
                                <a href="#" className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md">
                                    Read more
                                </a>
                            </div>
                        </div>
                        <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                            <img src="https://www.tailwind-kit.com/images/object/10.png" className="max-w-xs md:max-w-sm m-auto"/>
                        </div>
                    </div>
                </div>
                <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {getProducts().map((product, index) => {
                        return <ProductCard 
                                key={'product-card-' + index} 
                                productName={product.name} 
                                productPrice={product.price}
                                producIimage={product.image} 
                                productOldPrice={product.old_price}
                                />;
                    })}
                </section>
            </main>
            <Footer />
        </div>
    )
}