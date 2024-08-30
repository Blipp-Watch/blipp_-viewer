"use client";

import { useEffect, useState } from "react";
import Referral from "../components/referralSystem";

export default function Frens() {
    const [initData, setInitData] = useState("");
    const [userId, setUserId] = useState("");
    const [startParam, setStartParam] = useState("");

    useEffect(() => {
        const initWebApp = async () => {
            if (typeof window !== "undefined") {
                const WebApp = (await import("@twa-dev/sdk")).default;
                WebApp.ready();
                setInitData(WebApp.initData);
                const userIdValue = WebApp.initDataUnsafe.user?.id.toString() || "";
                console.log("User ID:", userIdValue);
                setUserId(userIdValue);
                setStartParam(WebApp.initDataUnsafe.start_param || "");
            }
        };
        initWebApp();
    }, []);
    

    return(
        <>
            {userId && (<Referral initData={initData} userId={userId} startParam={startParam} />)}
        </>
    )
}