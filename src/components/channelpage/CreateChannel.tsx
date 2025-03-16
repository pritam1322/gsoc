'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc-client/client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateChannel({ className = '' } : { className? : string }) {
  const { data: session } = useSession();
  const [channelName, setChannelName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tag, setTag] = useState("");
  const [open, setOpen] = useState(false); // Controls dialog visibility
  const channel = trpc.createChannel.useMutation();

  const mentorId = session?.user?.id || undefined;

  const handleCreate = async () => {
    if (!channelName.trim() || !companyName.trim()) {
      toast.error("Channel name and company name are required.");
      return;
    }

    try {
      const newChannel = await channel.mutateAsync({
        name: channelName,
        companyname: companyName,
        tag: tag,
        userId: mentorId!,
      });

      toast.success(`✅ Channel Created! Invite Link: ${newChannel.inviteLink}`);
      
      // Close the dialog and reset fields
      setOpen(false);
      setChannelName("");
      setCompanyName("");
      setTag("");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={className}>Create Channel</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
          <DialogDescription>
            Create a new channel and share the invite link with contributors.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input 
              id="name" 
              placeholder="Enter channel name" 
              className="col-span-3" 
              value={channelName} 
              onChange={(e) => setChannelName(e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyname" className="text-right">Company</Label>
            <Input 
              id="companyname" 
              placeholder="Enter company name" 
              className="col-span-3" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyname" className="text-right">Company</Label>
            <Input 
              id="tag" 
              placeholder="Enter tag" 
              className="col-span-3" 
              value={tag} 
              onChange={(e) => setTag(e.target.value)} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} className="w-full">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}