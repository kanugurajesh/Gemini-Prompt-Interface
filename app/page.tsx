"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"

export default function Home() {
  
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const onSubmit = async () => {
    // create a post request to the /api/chat endpoint
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPrompt: prompt,
      }),
    });

    // get the response from the server
    const data = await response.json();
    // set the response in the state
    setResponse(data.text);
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="prompt"
          className={cn("w-[380px] h-[45px]")}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button onClick={() => onSubmit()} className="absolute top-3 right-3" >
          <Send />
        </button>
      </div>
      <Card className={cn("w-[800px] h-[380px] p-5")}>
        <ReactMarkdown>{response}</ReactMarkdown>
      </Card>
    </main>
  );
      
}
