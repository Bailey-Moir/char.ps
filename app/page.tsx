'use client';
import './styles.scss';
import React, { useRef, useEffect } from 'react';

export default function Page() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        // Load image
        const image = new Image();
        image.onload = () => {
          // Draw the image into the canvas
          ctx.drawImage(image, 0, 0);
        };
        image.src = "/arlo.png";
    }, []);

    return <div id="main">
        <link href="https://fonts.googleapis.com/css?family=JetBrains+Mono" rel="stylesheet" />
        <div id="container">
            <canvas id="icon" ref={canvasRef} width="128" height="128">icon</canvas>
        </div>
        <h1 id="title">char.ps</h1>
    </div>
}
