'use client'

import { useEffect, useState } from "react";
import DirectionBar from "../ui/captain/DirectionBar";
import TextField from "../ui/captain/TextField";
import ResourceBar from "../ui/ResourceBar";
import "./styles.css"


export default function Page() {
    const [resourceAmount, setResourceAmount] = useState(0)

    const handleClick = () => {
        setResourceAmount(resourceAmount+10)
    }

    return (
        <div className="page">
            <DirectionBar />
            <TextField text={"OHHOHOO"} />
            <ResourceBar resourceAmount={resourceAmount}/>
            <button onClick={handleClick}></button>
        </div>
    );
}