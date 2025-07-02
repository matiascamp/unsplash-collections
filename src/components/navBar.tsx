'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const NavBar = () => {
    const pathName = usePathname()

    const isActive = (path:string) => pathName === path
    
    return (
            <nav className=" h-10 flex items-center justify-between p-8 border-b-1 border-gray-200 fixed w-full bg-white z-2" >
                <Image src="/Logo.svg" alt="home-logo" width={120} height={40} />
                <div className="flex gap-5">
                    <Link href={'/'} className={`font-medium text-sm cursor-pointer px-4 py-1  rounded-md ${isActive('/') ? 'bg-gray-200' : ''}` }>Home</Link>
                    <Link href={'/collections'} className={`font-medium text-sm cursor-pointer px-4 py-1  rounded-md ${isActive('/collections') ? 'bg-gray-200 ' : ''}` }>Collections</Link>
                </div>
            </nav>
    )
}

export default NavBar