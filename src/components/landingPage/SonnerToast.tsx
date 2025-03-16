"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerDemo({message, varianttype} : {
    message : string, 
    varianttype : "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" 
}) {
  return (
    <Button
      variant={varianttype}
      onClick={() =>
        toast(message, {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
