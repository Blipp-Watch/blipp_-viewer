"use client"
import MainView from "./components/MainView";
import { TonConnectUIProvider, useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import LoginView from "./components/LoginView";
import { VideoContextProvider } from "./context/videoContext";
import { useEffect, useState } from "react";

export default function Home() {
  let connected = true;
  const [ initData, setInitData ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ startParam, setStartParam ] = useState("");

  useEffect(() => {
    const initWebApp = async () => {
      if(typeof window !== 'undefined'){
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || "");
        setStartParam(WebApp.initDataUnsafe.start_param || "");
      }	
    };
    initWebApp();
  }, []);

  return (
      <VideoContextProvider>
        <main className="flex min-h-screen flex-col items-center justify-center items-center">
          <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
            {
              connected ? (<MainView/>) : 
              (<LoginView/>)
            }
          </div>
        </main>
      </VideoContextProvider>
  );
}
