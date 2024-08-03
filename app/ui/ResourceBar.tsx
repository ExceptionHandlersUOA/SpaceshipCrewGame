'use client'

import NextNProgress from 'nextjs-progressbar';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import 'nprogress/nprogress.css'; // Make sure to import the CSS for NProgress

export default function ResourceBar({ resourceAmount }: { resourceAmount: number }) {
    const [resAmount, setResAmount] = useState(0);

    useEffect(() => {
        setResAmount(resourceAmount);
        NProgress.set(resourceAmount / 100); // Assuming resourceAmount is a percentage
    }, [resourceAmount]);

    return (
        <>
            <NextNProgress color="white" height={100}/>
        </>
    );
}