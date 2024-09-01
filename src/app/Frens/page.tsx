"use client";
import { useContext } from "react";
import Referral from "../components/referralSystem";
import { TelegramContext, TelegramContextProvider } from "../context/TelegramProvider";

export default function Frens() {    

    const {initData, userId, startParam} = useContext(TelegramContext)

    return(
        <TelegramContextProvider>
            <Referral initData={initData} userId={userId} startParam={startParam} />
        </TelegramContextProvider>
    )
}