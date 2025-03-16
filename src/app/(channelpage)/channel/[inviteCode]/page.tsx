"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { trpc } from "@/trpc-client/client";

export default function JoinChannel() {
  const params = useParams();
  const inviteCode = params?.id as string;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/"); 
    }
}, [status, router]);

const mentorId = session?.user?.id || undefined;

  // Fetch channel by invite code
  const { data: channel, isLoading } = trpc.getByInviteCode.useQuery({ inviteCode } );

  // Handle joining channel
  const joinChannel = trpc.joinChannel.useMutation({
    onSuccess: () => {
      router.push(`/channel/${channel?.id}`);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  useEffect(() => {
    if (!session) {
      setError("You must be logged in to join a channel.");
    }
  }, [session]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className="lg:w-7/12 mt-10 lg:mt-10 mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-neutral-700">
            {/* Channel header */}
            <div className="border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">#</span>
                  <span className="ml-2 text-lg font-medium text-gray-800 dark:text-white">machine-learning-project</span>
                  <span className="ml-3 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full">12 members</span>
                </div>
                <div className="flex space-x-3">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-2 flex text-sm">
                <span className="text-gray-500 dark:text-gray-400">Channel for ML model optimization and algorithm improvements</span>
              </div>
            </div>
            
            {/* Channel messages */}
            <div className="h-96 overflow-y-auto px-6 py-4 bg-white dark:bg-neutral-800">
              {/* Day separator */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-200 dark:border-neutral-700"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-500 dark:text-gray-400">Today</span>
                <div className="flex-grow border-t border-gray-200 dark:border-neutral-700"></div>
              </div>
              
              {/* Message 1 */}
              <div className="flex mb-6">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm text-white">
                    JD
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-white mr-2">John Doe</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">10:30 AM</span>
                  </div>
                  <div className="prose prose-sm text-gray-700 dark:text-gray-300">
                    <p>Hey team, I've been working on optimizing the neural network training process. Current results show a ~20% improvement in training time.</p>
                  </div>
                  <div className="mt-1 flex space-x-2">
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700">
                      <span>👍</span> 2
                    </button>
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Message 2 with file attachment */}
              <div className="flex mb-6">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-sm text-white">
                    AL
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-white mr-2">Alex Lee</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">10:45 AM</span>
                  </div>
                  <div className="prose prose-sm text-gray-700 dark:text-gray-300">
                    <p>Great work! I've reviewed your changes and have some suggestions for further improvements.</p>
                  </div>
                  <div className="mt-2 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">optimization_feedback.md</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">143 KB • Markdown</p>
                      </div>
                      <button className="ml-auto p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 flex space-x-2">
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700">
                      <span>🙏</span> 3
                    </button>
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Thread reply indicator */}
              <div className="pl-14 mb-6">
                <button className="flex items-center px-3 py-1 text-xs bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <span>3 replies</span>
                </button>
              </div>
              
              {/* Message 3 with code snippet */}
              <div className="flex mb-6">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-sm text-white">
                    RK
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-white mr-2">Rachel Kim</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">11:15 AM</span>
                  </div>
                  <div className="prose prose-sm text-gray-700 dark:text-gray-300">
                    <p>I've implemented a new data preprocessing function that might help with the training time:</p>
                  </div>
                  <div className="mt-2 bg-gray-800 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm text-gray-200 overflow-x-auto">
                    <pre className="whitespace-pre-wrap">def preprocess_data(dataset, augment=True):
  # Normalize the input data
  dataset = normalize(dataset)
  
  if augment:
    # Apply data augmentation techniques
    dataset = apply_augmentation(dataset)
    
  return dataset</pre>
                  </div>
                  <div className="mt-1 flex space-x-2">
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700">
                      <span>💡</span> 5
                    </button>
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Bot/AI message */}
              <div className="flex mb-6">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-sm text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-white mr-2">GSoC Assistant</span>
                    <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 px-2 py-0.5 rounded">BOT</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">11:30 AM</span>
                  </div>
                  <div className="prose prose-sm text-gray-700 dark:text-gray-300">
                    <p>📅 <span className="font-medium">Reminder:</span> Weekly progress meeting today at 3:00 PM UTC.</p>
                    <p className="mt-1">Don't forget to update your milestone progress in the task board before the meeting.</p>
                  </div>
                  <div className="mt-2 flex">
                    <button className="text-xs mr-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                      Mark as Done
                    </button>
                    <button className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded">
                      Snooze
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message input */}
            <div className="border-t border-gray-200 dark:border-neutral-700 px-6 py-4 bg-gray-50 dark:bg-neutral-800">
              <div className="flex items-center">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <input type="text" className="ml-2 flex-1 rounded-md border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 py-2 px-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent" placeholder="Message #machine-learning-project" />
                <button className="ml-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
