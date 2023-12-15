"use client";

import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"

export default function Home() {
  
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("");

  const onSubmit = async () => {

    // clear the output
    setOutput("");

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

  useEffect(() => {
    // update the response character by character in the output
    if (response.length === 0) return;
    
    for (let i = 0; i < response.length; i++) {
      setTimeout(() => {
        setOutput((prev) => prev + response[i]);
      }, i * 5);
    }

  }, [response]);

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="prompt"
          className={cn("w-[400px] h-[45px]")}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <button onClick={() => onSubmit()} className="absolute top-3 right-3" >
          <Send />
        </button>
      </div>
      <Card className={cn("w-3/6 p-5 whitespace-normal")}>
        <div style={{ whiteSpace: "wrap" }}>
          <Markdown className={cn("w-full h-full")}>{`${output}`}</Markdown>
        </div>
      </Card>
    </main>
  );
      
}
