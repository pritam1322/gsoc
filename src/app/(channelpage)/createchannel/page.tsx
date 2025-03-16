"use client";

import ShareLink, { ChannelType } from "@/components/channelpage/ShareLink";
import TailwindV4Page from "@/components/channelpage/TailwindV4Page";
import { trpc } from "@/trpc-client/client";
import { EllipsisVertical, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateChannel } from "@/components/channelpage/CreateChannel";

export default function ChannelPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect unauthenticated users
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/"); 
        }
    }, [status, router]);

    const mentorId = session?.user?.id || undefined;

    const { data: channelList, isLoading, error } = trpc.getchannelsList.useQuery(
        { mentorId: mentorId ?? '' },
        { enabled: !!mentorId }
    );

    return (
        <section className="px-16">
            <TailwindV4Page />

            {/* Grid Layout */}
            <div className="gap-6 mt-2 border-t border-dashed border-neutral-600">
                {/* Right Section (Available Channels) */}
                <section className="w-full rounded-lg mt-8">
                    <h1 className="font-semibold text-3xl">Channels Available</h1>
                    <h2 className="text-sm text-neutral-300 mb-4">
                        Below are the channels created by you.
                    </h2>

                    {isLoading && <p className="text-neutral-400">Loading channels...</p>}
                    {error && <p className="text-red-500">Error loading channels.</p>}
                    {channelList?.length === 0 && !isLoading && !error && (
                        <p className="text-neutral-400">No channels available.</p>
                    )}

                </section>

                {/* Channel List Section */}
                <div className="mt-10 max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                Your Channels
                            </h4>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {channelList?.map((channel: ChannelType) => (
                                <div
                                    key={channel.id}
                                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <span className="text-xl font-bold text-gray-500 dark:text-gray-400 mr-2">
                                            #
                                        </span>
                                        <div>
                                            <h5 className="font-medium text-gray-900 dark:text-white">
                                                {channel.name}
                                            </h5>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {channel.tag}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span
                                        className={`
                                            mr-4 text-sm px-4 py-2 rounded-full
                                            ${
                                            channel.status === "Active"
                                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 font-mono"
                                                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                                            }
                                        `}
                                        >
                                        {channel.status}
                                        </span>

                                        {/* <ShareLink channel={channel} /> */}
                                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                            
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                <EllipsisVertical className="h-5 w-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56">
                                                    <DropdownMenuLabel>Action Panel</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenu>
                                                        <div>
                                                            <ShareLink channel={channel} />
                                                        </div>
                                                    </DropdownMenu>
                                                    <DropdownMenu>
                                                        <div
                                                            onClick={() => router.push(`/channel/${channel.inviteLink}`)} 
                                                            className="border border-neutral-700 p-1.5 hover:bg-[#272627] rounded-md text-center my-1 text-sm">
                                                            Open Channel
                                                        </div>
                                                    </DropdownMenu>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </button>
                                    </div>                          
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-center">
                            <button className="px-4 py-2 flex items-center justify-center mx-auto text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                                <Plus className="w-5 h-5 mr-1" />
                                <CreateChannel />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
