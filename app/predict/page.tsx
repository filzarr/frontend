"use client"
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function Predict() {
    const [form, setForm] = useState({
        algoritma: "",
        optimizer: "",
        image: null as File | null,
        imageName: "",
    });
    const [imgPre, setImgPre] = useState<string | null>(null);
    const [isUpload, setIsUpload] = useState(false);
    const [error, setError] = useState<string | null>(null); // State to handle error messages
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [answer, setAnswer] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            if (file) {
                // Validate file type and size
                if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
                    setError("Please upload an image file (JPEG, PNG, GIF, SVG).");
                    return;
                }
                if (file.size > 1024 * 1024 * 2) { // 2MB max size
                    setError("File size should not exceed 2MB.");
                    return;
                }

                setImgPre(URL.createObjectURL(file));
                setForm((prevData) => ({
                    ...prevData,
                    image: file,
                    imageName: file.name,
                }));
                setError(null); // Reset any previous errors
            }
        } else {
            setForm((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpload(true);
        setError(null); // Reset errors on submit

        if (!form.image) {
            setError("Please upload an image.");
            setIsUpload(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("algoritma", form.algoritma);
            formData.append("optimizer", form.optimizer);
            formData.append("image", form.image, form.imageName);

            const response = await axios.post("http://127.0.0.1:8080/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setAnswer(response.data.predicted_class); 
        } catch (error) {
            console.error(error);
            setError("Upload failed. Please try again.");
        } finally {
            setIsUpload(false);
            console.log("Form Data:", form);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <form onSubmit={handleSubmit} className="flex-1 px-64 flex flex-col items-center justify-center">
            <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-lg font-semibold text-gray-800">Algoritma Pelatihan Model</p>
                <ul className="flex gap-2 col-span-3">
                    {["mobilenetv3small", "mobilenetv3large", "efficientnetv2b0"].map((algo) => (
                        <li key={algo}>
                            <input
                                type="radio"
                                id={algo}
                                name="algoritma"
                                value={algo}
                                className="hidden peer"
                                required
                                checked={form.algoritma === algo}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor={algo}
                                className="inline-flex items-center justify-between w-full px-2 py-3 border rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600"
                            >
                                <p className="text-sm capitalize">{algo}</p>
                            </label>
                        </li>
                    ))}
                </ul>

                <p className="text-lg font-semibold text-gray-800">Optimizer</p>
                <ul className="flex gap-2 col-span-3">
                    {["adam", "sgd", "rmsprop", "adammax"].map((opt) => (
                        <li key={opt}>
                            <input
                                type="radio"
                                id={opt}
                                name="optimizer"
                                value={opt}
                                className="hidden peer"
                                required
                                checked={form.optimizer === opt}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor={opt}
                                className="inline-flex items-center justify-between w-full px-2 py-3 border rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600"
                            >
                                <p className="text-sm capitalize">{opt}</p>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center mt-8 justify-center w-6/12 relative overflow-hidden">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Upload Foto Disini</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" name="image" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleChange} />
                </label>
                {imgPre && (
                    <div className="mt-4" onClick={handleImageClick}>
                        <Image src={imgPre} alt="Preview" fill className="rounded-lg absolute top-0 left-0 right-0 bottom-0 min-w-full min-h-full" />
                    </div>
                )}
                {isUpload && (
                    <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 min-h-full min-w-full border border-gray-200 rounded-lg bg-gray-50/50 dark:bg-gray-800 dark:border-gray-700">
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {answer && <p className="text-gray-800 mt-4">{answer}</p>}

            <button
                type="submit"
                disabled={isUpload}
                className="mt-8 px-12 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
                Submit
            </button>
        </form>
    );
}
