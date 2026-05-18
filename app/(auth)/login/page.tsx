"use client";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { signInValidationSchema } from "@/app/util/validation";
import { SignInFormInputs } from "@/app/util/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from 'axios';
import api from "@/app/util/apiClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface ErrorResponse {
    detail: string;
}
export default function Page() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(signInValidationSchema), defaultValues: { email: "", password: "" }
    });
    const router = useRouter();
    async function onSubmit(data: SignInFormInputs) {
        try {
            await api.post("/api/v1/users/login", data);
            toast.success("Login successful!");
            reset();
            router.push("/user/Home");

        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response?.status === 401) {
                toast.error(
                    axiosError.response.data?.detail ||
                    "Invalid email or password"
                );
            } else if (axiosError.response?.status === 422) {
                toast.error("Validation error. Please check all fields.");
            } else {
                toast.error("Something went wrong");
            }
            console.error("Login Error:", error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="w-full max-w-6xl min-h-150 lg:min-h-[80vh] flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-8 bg-gray-200 ">
                    <Image
                        src="/Login/i18.png"
                        alt="Phone"
                        width={400}
                        height={500}
                        className="object-contain w-full max-w-125 max-h-[50vh] lg:max-h-[70vh]"
                        priority
                    />
                    <div className="text-center">
                        <p className="text-sm text-purple-800 mb-2">NEW ARRIVAL</p>
                        <h1 className="text-3xl xl:text-4xl font-semibold">
                            iPhone 14 <span className="text-purple-800">Pro</span>
                        </h1>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                            Created to change everything for the better.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-6 sm:p-10 flex items-center justify-center">
                    <div className="w-full max-w-md">

                        <h2 className=" text-2xl font-semibold mb-10 font-serif"><b>cyber</b></h2>
                        <h1 className="text-2xl font-semibold mb-2">
                            Welcome <span className="text-purple-800">back</span>
                        </h1>
                        <p className="text-gray-500 mb-6">
                            Please sign in to your account
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none" {...register('email')}
                                />
                                {errors.email && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.email.message}</span>}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none" {...register('password')}
                                />
                                {errors.password && <span style={{ color: 'red' }} className="text-sm min-h-2">{errors.password.message}</span>}

                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <Link href="#" className="text-gray-500 hover:text-black">
                                    Forgot password?
                                </Link>
                            </div>
                            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                                Sign In
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-500 mt-10">
                            Don’t have an account?{" "}
                            <Link href="/signup" className="text-purple-500 font-medium">
                                Sign up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}