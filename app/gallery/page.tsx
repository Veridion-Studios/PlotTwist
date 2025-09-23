"use client";

import {Card, CardFooter, CardBody, Image, Button} from "@heroui/react";
import { Play } from "lucide-react";

export default function App() {
  return (
    <div className="z-10">
        <h2 className="text-4xl font-extrabold mb-2 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
        Gallery
        </h2>
        <p className="mb-8 text-center text-lg text-gray-700 max-w-xl mx-auto font-medium">
          <span className="inline-block px-4 py-2 rounded-xl shadow">
            Currently, there is only{" "}
            <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent font-extrabold">
              one&nbsp;
            </span>
            story, but more are coming soon!
          </span>
        </p>
      <div className="flex justify-center">
        <Card className="py-4">
          <CardBody className="overflow-visible py-2 px-5">
            <Image
              alt="The missing Manuscript"
              className="object-cover rounded-xl"
              src="/manuscript.jpeg"
              width={270}
            />
          </CardBody>
          <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
            <p className="uppercase font-bold">The Missing Manuscript</p>
            <small className="text-default-500">Mystery</small>
            <Button
                as="a"
                href="/play/manuscript"
                color="default"
                className="mt-2 font-bold w-full flex items-center justify-center gap-2"
                >
                <Play className="h-4 w-4" />
                Play
                </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
