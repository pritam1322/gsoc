import { CircleCheck, CirclePlay, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero(){
    return(
        <section className=" min-h-[70vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                
                <div className="relative z-10 gap-13 items-center text-center py-16 mt-20 relative -top-10">
                    {/* Left Content */}
                    <div className="flex justify-center font-semibold mb-2 bg-neutral-100 items-center gap-2 p-2 rounded-lg text-neutral-900 max-w-xs mx-auto">
                        <Image src="/gsoc_logo.png" alt="gsoc" width="28" height="28" className="rounded-lg"/>Google Summer of Code    
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            <span className=""> Collaborate, Innovate,</span>
                            <span className="text-indigo-500"> Succeed in GSoC with </span>
                            <span className="text-red-800"> Mentors & Peers</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8">
                            {/* Track applications, generate templates, and get insights to land your dream job faster with JobPouch&apos;s all-in-one platform. */}
                            Streamline your GSoC proposal with mentorship, collaboration, and real-time feedback.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={'/createchannel'} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-900 md:text-lg">
                                Get Started Free
                                <MoveRight className="ml-2 -mr-1 w-5 h-5"/>
                            </Link>
                            <Link href='/' className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 md:text-lg">
                                Watch Demo
                                <CirclePlay className="ml-2 -mr-1 w-5 h-5"/>
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center space-x-4 text-gray-400 justify-center">
                            <div className="flex items-center">
                                <CircleCheck fill="#969696" color={'black'} className="w-5 h-5 mr-1"/>
                                Free 14-day trial
                            </div>
                            <div className="flex items-center">
                                <CircleCheck fill="#969696" color={'black'} className="w-5 h-5 mr-1"/>
                                No credit card required
                            </div>
                        </div>
                        
                    </div>

                    {/* right Content */}

                    
                    
                </div>
                <div className="hidden lg:block absolute -right-20 top-20 bg-black backdrop-blur-sm p-4 rounded-lg shadow-xl transform rotate-3 w-80 border border-indigo-500/30">
                    <div className="text-sm font-mono text-gray-200">
                        <div className="text-indigo-400">import { <span className="text-green-400">useState</span> } from &apos;react&apos;;</div>
                        <div className="text-indigo-400">function <span className="text-yellow-400">ProposalBuilder</span>() {"{"}</div>
                        <div className="ml-4 text-white">const [proposal, setProposal] = <span className="text-yellow-400">useState</span>();</div>
                        {/* <div className="ml-4 text-pink-400">// AI-powered suggestions</div> */}
                        <div className="text-indigo-400">{"}"}</div>
                    </div>
                </div>

                <div className="hidden lg:block absolute -left-20 bottom-6 bg-black backdrop-blur-sm p-4 rounded-lg shadow-xl transform rotate-2 w-72 border border-indigo-500/30">
                    <div className="text-sm font-mono text-gray-200 pl-20">
                        <div className="text-indigo-400">type <span className="text-yellow-400">Mentor</span> = {"{"}</div>
                        <div className="ml-4 text-white">id: string;</div>
                        <div className="ml-4 text-white">skills: string[];</div>
                        <div className="ml-4 text-white">projectsLed: number;</div>
                        <div className="text-indigo-400">{"}"}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}