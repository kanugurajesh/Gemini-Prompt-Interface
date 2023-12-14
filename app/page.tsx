"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

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
    <main>
      <input
        type="text"
        placeholder="prompt"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <button onClick={() => onSubmit()}>Submit</button>
      <ReactMarkdown>{response}</ReactMarkdown>
    </main>
  );
}
