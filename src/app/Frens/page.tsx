"use client";

import { useState } from "react";
import Referral from "../components/referralSystem";

export default function Frens() {
    const [initData, setInitData] = useState("");
    const [userId, setUserId] = useState("");
    const [startParam, setStartParam] = useState("");

    return(
        <>
            <Referral initData={initData} userId={userId} startParam={startParam} />
        </>
    )
}