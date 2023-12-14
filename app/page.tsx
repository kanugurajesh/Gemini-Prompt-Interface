"use client"

const onSubmit = async () => {

  // create a post request to the /api/chat endpoint
  const response = await fetch("api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userPrompt: "What is Programming?",
    })
  })
}

export default function Home() {
  return (
    <main>
      <button onClick={()=>onSubmit()}>Click me</button>
    </main>
  )
}
