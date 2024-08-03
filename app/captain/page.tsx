'use client'

import { useEffect, useState } from "react";
import DirectionBar from "../ui/captain/DirectionBar";
import TextField from "../ui/captain/TextField";
import "./styles.css"
import ResourceBar from "../ui/captain/ResourceBar";


export default function Page() {
    const [resourceAmount, setResourceAmount] = useState(0)

    const handleClick = () => {
        if (resourceAmount < 100) {
            setResourceAmount(resourceAmount+1)
        }
    }

    return (
        <div className="page">
            <DirectionBar redSection={0} />
            <TextField text={"OHHOHOO"} />
            <ResourceBar resource={"water"} value={resourceAmount} />
            <button onClick={handleClick} className="button">Progress</button>
        </div>
    );
}