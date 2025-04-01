import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
     return (
          <nav className="px-64 shadow py-4 bg-white justify-between flex items-center">
               <Image src="/logo-usu.webp" alt="logo" width={50} height={50} />
               <ul className="flex gap-8 items-center">
                    <Link href="/">
                         <li className="font-semibold ">Beranda</li>
                    </Link>
                    <Link href="/predict">
                         <li className="font-semibold ">Predict</li>
                    </Link>
               </ul>
          </nav>
     )
}