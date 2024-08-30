import { TonConnectButton } from "@tonconnect/ui-react";
import Image from "next/image";

export default function LoginView() {
    return(
    <div className="flex flex-col h-full">
        <div className="flex flex-col items-center justify-center">
            <Image src="/adsdrop.png" width={100} height={100} alt="AppLogo"/>
            <h1 className="text-3xl font-bold mt-4">Welcome to AdsDrop</h1>
            <p className="text-lg mt-4">Connect your wallet to get started</p>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
            <TonConnectButton />
        </div>
    </div>
)}