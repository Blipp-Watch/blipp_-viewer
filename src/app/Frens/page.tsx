"use client";
import { useContext } from "react";
import Referral from "../components/referralSystem";
import { TelegramContext } from "../context/TelegramProvider";

export default function Frens() {    

    const {initData, userId, startParam} = useContext(TelegramContext)

    return(
        <>
            <Referral initData={initData} userId={userId} startParam={startParam} />
        </>
    )
}