
import Image from 'next/image'
import heroImage from "../../../../public/common/about.png"
import heroImage2 from "../../../../public/common/aboutbg3.png"

const page = () => {
    const team = [
        {
            name: "Aansvi Shah",
            role: "Frontend Developer",
            img: "/common/profile.jpg",
        },
        {
            name: "Meera Patel",
            role: "Backend Developer",
            img: "/common/profile3.png",
        },
        {
            name: "Rohan Mehta",
            role: "UI/UX Designer",
            img: "/common/profile4.png",
        },
    ];
    return (
        <>
            <div className="relative w-full h-80 mt-0 4xl:ml-0">
                <Image src={heroImage2} alt="heroImage" className="absolute inset-0 w-full h-full object-cover " />
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h1 className="text-5xl text-white font-extrabold font-serif">About Us</h1>
                </div>
            </div>
            <div className="py-10 px-6 bg-gray-200 rounded-2xl border border-gray-50 mt-10">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Meet Our Team
                </h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
                        >
                            <Image
                                src={member.img}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-black-700"
                            />
                            <h3 className="mt-4 text-xl font-semibold">
                                {member.name}
                            </h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 lg:px-10 xl:px-20 2xl:px-40 py-10">

                
                <div className="bg-[#F9F1E7] rounded-2xl w-full max-w-150">
                    <Image
                        src={heroImage}
                        alt="product category"
                        width={600}
                        height={480}
                        className="w-full h-auto rounded-2xl animate-fadeIn [animation-delay:0.6s]"
                    />
                </div>

                
                <div className="w-full max-w-200">

                    <p className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left">
                        Our Story & Mission
                    </p>

                    <div className="font-light text-base sm:text-lg text-gray-700 mt-5 space-y-4">

                        <p>
                            Explore the world of cutting-edge technology where innovation meets performance. We bring you the latest smartphones, powerful laptops, and high-quality cameras.
                        </p>

                        <p>
                            Step into the future of gaming and productivity with advanced electronics built for performance. From high-speed gaming joysticks to professional-grade laptops.
                        </p>

                        <p>
                            Discover a seamless blend of power and precision with our premium electronic collection. Whether you are capturing life through a camera, enjoying immersive gaming.
                        </p>

                    </div>
                </div>

            </div>

        </>
    )
}

export default page
