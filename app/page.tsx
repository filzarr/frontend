import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 min-h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Skripsi
            </span>
          </button>
        </div>
        <h1 className="font-semibold text-gray-800 text-3xl">Identifikasi Penyakit Gigi dan Mulut Menggunakan Metode MobileNetV3 dan EfficientNetV2</h1>
        <h3 className="font-semibold text-gray-700">Filza Rizki Ramadhan(211402146)</h3>
        <div className="flex">
          <Link type="button" href={'/predict'} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Mulai Identifikasi</Link>
        </div>
      </div>
    </div>
  );
}
