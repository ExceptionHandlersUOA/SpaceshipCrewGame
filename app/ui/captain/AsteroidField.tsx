"use client";
import { useEffect, useRef } from "react";

function setUpCanvas(canvas: HTMLCanvasElement, onAsteroidClick: () => void) {
    // draw a starfield effect

    const ctxNullable = canvas.getContext('2d');
    if (ctxNullable == null) {
        return;
    }
    const ctx = ctxNullable;

    // set canvas size to parent container
    if (canvas.parentElement != null) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    }

    const width = canvas.width;
    const height = canvas.height;

    const starCount = 100;
    const stars: { x: number; y: number; size: number; }[] = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3,
        });
    }

    function drawStar(star: {x: number, y: number, size: number}) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    // should be jagged and uneven
    const asteroidGeometry: [number, number][] = [];

    function regenAsteroidGeometry() {
        for (let i = 0; i < 30; i++) {
            let theta = (i / 30) * Math.PI * 2;
            let radius = 50 + Math.random() * 20;
            let cx = radius * Math.cos(theta);
            let cy = radius * Math.sin(theta);
            asteroidGeometry.push([cx, cy]);
        }
        asteroidGeometry.push(asteroidGeometry[0]);
    }

    regenAsteroidGeometry();

    let asteroid = { x: 0, y: 9999999, rotation: 0, spinDir: 1, hide: false };

    function rotateCoord(coords: [number, number], posX: number, posY: number, angle: number): [number, number] {
        const x = coords[0];
        const y = coords[1];
        return [
            x * Math.cos(angle) - y * Math.sin(angle) + posX,
            x * Math.sin(angle) + y * Math.cos(angle) + posY,
        ];
    }

    // draws an old-school style asteroid (like the game asteroids)
    function drawAsteroid() {
        if (asteroid.hide) {
            return;
        }
        ctx.beginPath();

        const x = asteroid.x;
        const y = asteroid.y;

        // ctx.moveTo(x + asteroidGeometry[0][0], y + asteroidGeometry[0][1]);
        ctx.moveTo(...rotateCoord(asteroidGeometry[0], x, y, asteroid.rotation));
        for (let i = 1; i < asteroidGeometry.length; i++) {
            // ctx.lineTo(x + asteroidGeometry[i][0], y + asteroidGeometry[i][1]);
            ctx.lineTo(...rotateCoord(asteroidGeometry[i], x, y, asteroid.rotation));
        }

        ctx.fillStyle = '#333';
        ctx.strokeStyle = 'white';
        ctx.fill();
        ctx.stroke();
    }


    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        for (const star of stars) {
            drawStar(star);
        }
        drawAsteroid();
    }

    function clearAsteroid() {
        asteroid.y = -100;
        const gapX = 100;
        asteroid.x = Math.random() * (width - gapX * 2) + gapX;
        if (Math.random() > 0.5) {
            asteroid.spinDir = -asteroid.spinDir;
        }
        asteroid.hide = false;
    }

    // TODO use dt
    let lastUpdate: number | null = null;
    function update() {
        if (lastUpdate == null) {
            lastUpdate = Date.now();
            return;
        }
        let thisUpdate = Date.now();
        let dt = ((thisUpdate - lastUpdate) / 1000) * 60;
        for (const star of stars) {
            star.y += 0.5 * dt;
            star.x += ((star.x - width / 2) * 0.001 * star.y / height) * dt;
            if (star.y > height || star.x < 0 || star.x > width) {
                star.y = 0 - Math.random() * 50;
                star.x = Math.random() * width;
            }
        }
        asteroid.y += 1 * dt;
        asteroid.rotation += 0.01 * dt * asteroid.spinDir;
        if (asteroid.y > height + 100) {
            clearAsteroid();
        }
        while (asteroid.rotation > Math.PI * 2) {
            asteroid.rotation -= Math.PI * 2;
        }
        lastUpdate = thisUpdate;
    }

    function onClick(posX: number, posY: number) {
        let diffX = posX - asteroid.x;
        let diffY = posY - asteroid.y;
        diffX *= diffX;
        diffY *= diffY;
        let dist = Math.sqrt(diffX + diffY);
        if (dist <= 60 && !asteroid.hide) {
            asteroid.hide = true;
            if (onAsteroidClick != null) {
                onAsteroidClick();
            }
        }
    }

    canvas.onclick = (e) => {
        e.preventDefault();
        let rect = canvas.getBoundingClientRect();
        onClick(e.clientX - rect.left, e.clientY - rect.top);
    };

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    loop();
}

export default function AsteroidField({ className, onAsteroidClick }: { className: string, onAsteroidClick: () => void }) {
    useEffect(() => {
        setUpCanvas(canvasEl.current!, onAsteroidClick);
    }, []);

    let canvasEl = useRef<HTMLCanvasElement>(null);

    return <canvas ref={canvasEl} className={className} style={{
        userSelect: 'none',
        outline: 'none',
        WebkitTouchCallout: 'none'
    }}></canvas>;
}
