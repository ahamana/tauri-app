import { invoke } from "@tauri-apps/api/core";
import { cn } from "cn";
import { useRef, useState } from "react";

import reactLogo from "@/assets/react.svg";

import "@/App.css";

function Logo({
  alt,
  className,
  href,
  src,
}: {
  alt: string;
  className?: string;
  href: string;
  src: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img
        src={src}
        className={cn("h-24 p-6 transition-[filter] duration-750", className)}
        alt={alt}
      />
    </a>
  );
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const nameRef = useRef("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name: nameRef.current }));
  }

  return (
    <main className="flex flex-col justify-center pt-[10vh] text-center">
      <h1 className="my-[0.67em] text-[2em] font-bold">Welcome to Tauri + React</h1>

      <div className="flex items-center justify-center">
        <Logo
          href="https://vitejs.dev"
          src="/vite.svg"
          className="hover:drop-shadow-vite"
          alt="Vite logo"
        />
        <Logo
          href="https://tauri.app"
          src="/tauri.svg"
          className="hover:drop-shadow-tauri"
          alt="Tauri logo"
        />
        <Logo
          href="https://reactjs.org"
          src={reactLogo}
          className="hover:drop-shadow-react"
          alt="React logo"
        />
      </div>
      <p className="my-4">Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="flex items-center justify-center gap-1.25"
        onSubmit={(e) => {
          e.preventDefault();
          void greet();
        }}
      >
        <label htmlFor="greet-input">Name</label>
        <input
          id="greet-input"
          className="rounded-lg border border-transparent bg-white px-[1.2em] py-[0.6em] font-medium text-content shadow-[0_2px_2px_rgba(0,0,0,0.2)] transition-colors duration-250 outline-none dark:bg-[#0f0f0f98] dark:text-white"
          onChange={(e) => {
            nameRef.current = e.currentTarget.value;
          }}
          placeholder="Enter a name..."
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg border border-transparent bg-white px-[1.2em] py-[0.6em] font-medium text-content shadow-[0_2px_2px_rgba(0,0,0,0.2)] transition-colors duration-250 outline-none hover:border-focus active:border-focus active:bg-[#e8e8e8] dark:bg-[#0f0f0f98] dark:text-white dark:active:bg-[#0f0f0f69]"
        >
          Greet
        </button>
      </form>
      <p className="my-4">{greetMsg}</p>
    </main>
  );
}

export default App;
