"use client";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, User, Phone, Calendar, AtSign, } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { SignUpFormInputs } from "@/app/util/type";
import { signUpValidationSchema } from "@/app/util/validation";
import api from "@/app/util/apiClient";

interface ErrorResponse {
    detail: string;
}

export default function Page() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<SignUpFormInputs>({
        resolver: zodResolver(signUpValidationSchema), defaultValues: { firstName: "", lastName: "", username: "", email: "", phoneNumber: "", gender: "", dateOfBirth: "", password: "", },
    });

    async function onSubmit(data: SignUpFormInputs) {
        const payload = {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
            email: data.email,
            phone_number: data.phoneNumber,
            gender: data.gender,
            date_of_birth: new Date(data.dateOfBirth).toISOString().replace("Z", ""),
            password: data.password,
        };

        try {
            console.log("Signup Payload:", payload);
            await api.post("/api/v1/users/", payload);
            toast.success("Account created successfully!");
            reset();
            router.push("/login");
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response?.status === 409) {
                toast.error(
                    axiosError.response.data?.detail ||
                    "User already exists"
                );
            } else if (axiosError.response?.status === 400) {
                toast.error(
                    axiosError.response.data?.detail ||
                    "Invalid input data"
                );
            } else if (axiosError.response?.status === 422) {
                toast.error("Validation error. Please check all fields.");
            } else {
                toast.error("Something went wrong");
            }
            console.error("Signup Error:", error);
        }
    }

    const inputClass =
        "w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500";

    const errorClass = "text-sm text-red-500 mt-1 min-h-[20px]";

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 py-8">
            <div className="w-full max-w-6xl lg:min-h-[90vh] flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-8 bg-gray-200">
                    <Image
                        src="/Login/i16.png"
                        alt="Phone"
                        width={400}
                        height={500}
                        className="object-contain w-full max-w-125 max-h-[50vh] lg:max-h-[70vh]"
                        priority
                    />

                    <div className="text-center mt-6">
                        <p className="text-sm text-purple-800 mb-2">JOIN US</p>

                        <h1 className="text-3xl xl:text-4xl font-semibold">
                            Explore premium{" "}
                            <span className="text-purple-800">gadgets</span>
                        </h1>

                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                            Start your journey with us today.
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-10 font-serif">
                            <b>cyber</b>
                        </h2>

                        <h1 className="text-2xl font-semibold mb-2">
                            Create <span className="text-purple-800">account</span>
                        </h1>

                        <p className="text-gray-500 mb-6">
                            Please fill the details to register
                        </p>

                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className={inputClass}
                                            {...register("firstName")}
                                        />
                                    </div>
                                    <p className={errorClass}>
                                        {errors.firstName?.message}
                                    </p>
                                </div>

                                <div>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className={inputClass}
                                            {...register("lastName")}
                                        />
                                    </div>
                                    <p className={errorClass}>
                                        {errors.lastName?.message}
                                    </p>
                                </div>
                            </div>


                            <div>
                                <div className="relative">
                                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className={inputClass}
                                        {...register("username")}
                                    />
                                </div>
                                <p className={errorClass}>
                                    {errors.username?.message}
                                </p>
                            </div>


                            <div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className={inputClass}
                                        {...register("email")}
                                    />
                                </div>
                                <p className={errorClass}>
                                    {errors.email?.message}
                                </p>
                            </div>


                            <div>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className={inputClass}
                                        {...register("phoneNumber")}
                                    />
                                </div>
                                <p className={errorClass}>
                                    {errors.phoneNumber?.message}
                                </p>
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <select
                                        className="w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        {...register("gender")}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <p className={errorClass}>
                                        {errors.gender?.message}
                                    </p>
                                </div>

                                <div>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="date"
                                            className={inputClass}
                                            {...register("dateOfBirth")}
                                        />
                                    </div>
                                    <p className={errorClass}>
                                        {errors.dateOfBirth?.message}
                                    </p>
                                </div>
                            </div>


                            <div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className={inputClass}
                                        {...register("password")}
                                    />
                                </div>
                                <p className={errorClass}>
                                    {errors.password?.message}
                                </p>
                            </div>


                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Creating Account..." : "Sign Up"}
                            </button>
                        </form>


                        <p className="text-center text-sm text-gray-500 mt-8">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-purple-600 font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}