import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

const BorderDirections = ['east', 'south-east', 'south', 'south-west', 'west'] as const;
type BorderDirection = typeof BorderDirections[number];

export default function Window(props: { children: React.ReactNode, title: string, width?: number, height?: number, x?: number, y?: number }) {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const windowRef = useRef<Window | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        windowRef.current = window;

        setWidth((props.width ?? 80) * (window.innerWidth / 100));
        setHeight((props.height ?? 80) * (window.innerHeight / 100));
        setX((props.x ?? (100 - (props.width ?? 80)) / 2) * (window.innerWidth / 100));
        setY((props.y ?? (100 - (props.height ?? 80)) / 2) * (window.innerHeight / 100));
    }, [props.width, props.height, props.x, props.y]);

    function startDragging(header: HTMLDivElement) {
        if (!windowRef.current) return;

        windowRef.current.document.body.style.userSelect = 'none';

        header.style.cursor = 'grabbing';

        let initialized = false;
        let initialX = x;
        let initialY = y;
        let originX = 0;
        let originY = 0;

        const handleMouseMove = (ev: MouseEvent) => {
            if (!initialized) {
                originX = ev.clientX;
                originY = ev.clientY;
                initialized = true;
                return;
            }

            setX(ev.clientX - originX + initialX);
            setY(ev.clientY - originY + initialY);
        };

        const handleMouseUp = () => {
            windowRef.current?.removeEventListener('mousemove', handleMouseMove);
            windowRef.current?.removeEventListener('mouseup', handleMouseUp);
            windowRef.current!.document.body.style.userSelect = '';
            header.style.cursor = 'grab';
        };

        windowRef.current.addEventListener('mousemove', handleMouseMove);
        windowRef.current.addEventListener('mouseup', handleMouseUp);
    }

    function startScaling(direction: BorderDirection, border: HTMLDivElement) {
        if (!windowRef.current) return;

        windowRef.current.document.body.style.userSelect = 'none';

        let initialized = false;
        let initialX = x;
        let initialW = width;
        let initialH = height;
        let originX = 0;
        let originY = 0;

        const handleMouseMove = (ev: MouseEvent) => {
            if (!initialized) {
                originX = ev.clientX;
                originY = ev.clientY;
                initialized = true;
                return;
            }

            if (direction.includes('south')) {
                setHeight(ev.clientY - originY + initialH);
            }
            if (direction.includes('east')) {
                setWidth(ev.clientX - originX + initialW);
            } else if (direction.includes('west')) {
                setX(ev.clientX - originX + initialX);
                setWidth(-(ev.clientX - originX) + initialW);
            }
        };

        const handleMouseUp = () => {
            windowRef.current?.removeEventListener('mousemove', handleMouseMove);
            windowRef.current?.removeEventListener('mouseup', handleMouseUp);
            windowRef.current!.document.body.style.userSelect = '';
        };

        windowRef.current.addEventListener('mousemove', handleMouseMove);
        windowRef.current.addEventListener('mouseup', handleMouseUp);
    }

    if (windowRef === null) return null; // don't render until window is ready

    return (
        <div
            style={{ width: `${width}px`, height: `${height}px`, left: `${x}px`, top: `${y}px` }}
            className={styles.root}
        >
            <div style={{ cursor: 'grab' }}
                onMouseDown={ev => startDragging(ev.currentTarget)}>
                <div></div> {/* Gloss */}
                <div className={styles.header}>
                    <p className={styles.title}>{props.title}</p>
                    <div className={styles.controls}>
                        <button className={styles.minimize}><div></div></button>
                        <button className={styles.maximize}><div></div></button>
                        <button className={styles.close}>✕</button>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                {BorderDirections.map(direction => (
                    <div style={{ cursor: `${direction.split('-').map(x => x.charAt(0)).join('')}-resize` }}
                        onMouseDown={ev => startScaling(direction, ev.currentTarget)}
                        className={styles[`${direction}-border`]}></div>
                ))},
                <div className={styles.content}>{props.children}</div>
            </div>
        </div>
    );
}
