"use client"
import MainView from "./components/MainView";
import LoginView from "./components/LoginView";

export default function Home() {
  let connected = true;

  return (
        <main className="flex min-h-screen flex-col items-center justify-center items-center">
          <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
            {
              connected ? (<MainView/>) : 
              (<LoginView/>)
            }
          </div>
        </main>
  );
}
