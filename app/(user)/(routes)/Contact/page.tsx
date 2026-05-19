"use client";
import Swal from "sweetalert2";
import { contactSchema } from "@/app/util/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ContactFormInputs } from "@/app/util/type";
import heroImage2 from "../../../../public/common/aboutbg3.png";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

const Page = () => {
    const emptyValue: ContactFormInputs = {
        name: "",
        email: "",
        subject: "",
        message: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormInputs>({
        resolver: zodResolver(contactSchema),
        defaultValues: emptyValue,
    });

    async function onSubmit(data: ContactFormInputs) {
        const storedUsers = localStorage.getItem("Contact");
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        users.push(data);
        localStorage.setItem("Contact", JSON.stringify(users));
        Swal.fire({
            text: "Message sent successfully!",
            icon: "success",
        });
        reset(emptyValue);
    }

    return (
        <>

            <div className="relative w-full h-64 sm:h-72 md:h-80">
                <Image
                    src={heroImage2}
                    alt="heroImage"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-extrabold font-serif">
                        Contact Us
                    </h1>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
                <div className="text-center mb-12">
                    <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
                        Get In Touch With Us
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-3">
                        For more information about our product & services, feel free to
                        drop us an email. Our staff will always be there to help you.
                    </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-10">
                        <div className="flex gap-4">
                            <MapPin size={28} />
                            <div>
                                <h3 className="font-semibold text-lg">Address</h3>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    236 5th SE Avenue, New York NY10000, United States
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Phone size={28} />
                            <div>
                                <h3 className="font-semibold text-lg">Phone</h3>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Mobile: +(84) 546-6789 <br />
                                    Hotline: +(84) 456-6789
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Clock size={28} />
                            <div>
                                <h3 className="font-semibold text-lg">Working Time</h3>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Mon–Fri: 9:00 - 22:00 <br />
                                    Sat–Sun: 9:00 - 21:00
                                </p>
                            </div>
                        </div>
                    </div>


                    <Card className="border-0 shadow-md w-full">
                        <CardContent>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >

                                <div>
                                    <label className="text-sm">Name</label>
                                    <input
                                        {...register("name")}
                                        className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-gray-300"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>


                                <div>
                                    <label className="text-sm">Email</label>
                                    <input
                                        {...register("email")}
                                        className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-gray-300"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>


                                <div>
                                    <label className="text-sm">Subject</label>
                                    <input
                                        {...register("subject")}
                                        className="w-full h-12 px-4 border rounded-md focus:ring-2 focus:ring-gray-300"
                                    />
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </div>


                                <div>
                                    <label className="text-sm">Message</label>
                                    <textarea
                                        rows={4}
                                        {...register("message")}
                                        className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-gray-300"
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>


                                <button
                                    type="submit"
                                    className="w-full h-12 bg-[#211C24] text-white rounded-md hover:bg-gray-700 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </>
    );
};

export default Page;