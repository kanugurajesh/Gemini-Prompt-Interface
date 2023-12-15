"use client";

import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import { Input } from "@/components/ui/input"
import { MessageCircleCode } from "lucide-react";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import toast, { Toaster } from "react-hot-toast";
import styles from '../styles/styles.module.css'

export default function Home() {
  
  // state for the prompt, response and output
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [output, setOutput] = useState("The response will appear here...");

  const onKeyDown = (e:any) => {
    // Check if the Ctrl key is pressed along with the Enter key
    if (e.ctrlKey && e.key === "Enter") {
      // Prevent the default behavior of the Enter key (e.g., new line in textarea)
      e.preventDefault();
      // Trigger the onSubmit function
      onSubmit();
    }
  };

  const onSubmit = async () => {

    if (prompt === "") {
      toast.error("Prompt cannot be empty!");
      return;
    }

    // clear the output
    setOutput("The response will appear here...");

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
    <main className={`flex flex-col justify-center items-center h-screen gap-4`}>
      <Toaster />
      <div className="flex gap-2 items-center mb-5">
        <MessageCircleCode size="64" />
        <span className="text-3xl font-bold">Chaty</span>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="prompt"
          className={cn("min-w-[320px] w-[380px] h-[50px]")}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onKeyDown={(e) => onKeyDown(e)}
        />
        <button onClick={() => onSubmit()} className="absolute top-3 right-3 hover:scale-110 transition ease-in-out">
          <Send />
        </button>
      </div>
      <Card className={cn("w-4/6 p-5 whitespace-normal min-w-[320px] w-[380px]")}>
        <div className={`${styles.textwrapper}`}>
          <Markdown className={cn("w-full h-full ")}>{`${output}`}</Markdown>
        </div>
      </Card>
    </main>
  );
      
}
