import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex item-center justify-between py-6">
            <Link href="/">
                <div className="flex items-center cursor-pointer">
                    {/* <Image src="/logo.png" height={35} width={40} /> */}
                    <span className="font-bold ml-2 p-2 rounded-md text-white bg-primary">
                         Blog App
                    </span>
                </div>
            </Link>
            <ul className="flex items-center">
                <li className="mr-6 font-medium text-gray-600">
                    <Link href={'/career'}><a href="#">Career</a></Link>
                </li>
                <li className="mr-6 font-medium text-gray-600">
                    <a href="#">PQR</a>
                </li>
                <li className="mr-6 font-medium text-gray-600">
                    <a href="#">STU</a>
                </li>
                <li className="mr-6 font-medium text-gray-600">
                    <a href="#">XYZ</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
