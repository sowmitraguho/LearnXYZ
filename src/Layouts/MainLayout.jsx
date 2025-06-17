import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    );
};

export default MainLayout;