'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { useState } from 'react';

export type ChannelType = {
    name: string;
    companyname: string; 
    mentorId: string;
    id: string;
    inviteLink: string;
    tag: string;
    status: string;
  }

export default function ShareLink({ channel } : {channel : ChannelType}){

    const [copied, setCopied] = useState(false);

    const handleCopy = (link: string) => {
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    const inviteURL = process.env.NEXT_PUBLIC_BASE_URL + '/channel/' + channel.inviteLink;

    return (
        <section>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full" variant={'outline'}>Share Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                    </DialogHeader>
                    <div className=" flex gap-4 py-4">
                        <div className="items-center gap-4 w-full">
                            <Label htmlFor="link" className="sr-only">Link</Label>
                            <Input id={`link-${channel.id}`} value={inviteURL} className="w-full" readOnly />
                        </div>
                        <Button 
                            type="button"
                            size="sm"
                            className="px-3"
                            onClick={() => handleCopy(inviteURL)}
                        >
                            <span className="sr-only">Copy</span>
                            <Copy />
                        </Button>
                    </div>
                    <DialogFooter>
                        
                        {copied && <p className="text-green-400 mt-2 text-sm">Copied to clipboard!</p>}
                    </DialogFooter>
                </DialogContent>
                </Dialog>
        </section>
    )
}