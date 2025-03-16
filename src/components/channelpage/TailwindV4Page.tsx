
import { CreateChannel } from "./CreateChannel";

export default function TailwindV4Page() {
  return (
    <div className="container-wrapper">
      <div className="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">

        {/* Heading & Description */}
        <h1 className="text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]">
          Create your channel here
        </h1>
        <p className="max-w-2xl text-base font-light text-foreground sm:text-lg">
          Create a channel for a smooth and responsive way to connect with contributors and mentors.

        </p>

        {/* Buttons */}
        <div className="flex w-full items-center justify-start gap-2 pt-2">
          <CreateChannel className="border border-white p-2 rounded-sm font-semibold text-sm bg-neutral-100 hover:bg-neutral-300 text-black"/>
        </div>
      </div>
    </div>
  );
}
