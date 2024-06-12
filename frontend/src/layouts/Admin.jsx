
import Nav from "../components/layouts/Nav";
import { Outlet } from "react-router-dom";
import Aside from "../components/layouts/Aside";
import Footer from "../components/layouts/Footer";
import { useSelector, useDispatch } from 'react-redux'
import { toggle as sidebarAdminToggle } from '../redux/sidebarAdminSlice.mjs'
import classNames from "classnames";

export default function Admin () {
    const collapsed = useSelector(state => state.sidebarAdmin.collapsed);
    const dispatch = useDispatch();
    const backdropClasses = classNames('bg-gray-900 opacity-50 fixed inset-0 z-10', {
        hidden: collapsed
    });

    return (
        <div>
            <Nav />
            <div className="flex overflow-hidden bg-white pt-16 h-full">
                <Aside />
                <div className={backdropClasses} id="sidebarBackdrop" onClick={() => dispatch(sidebarAdminToggle())}></div>
                <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                    <main className="min-h-96">
                        <div className="pt-7 px-4">
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                    <p className="text-center text-sm text-gray-500 my-10">
                        &copy; 2019-2021 <a href="#" className="hover:underline" target="_blank">Themesberg</a>. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
} 