import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { icon } from '@fortawesome/fontawesome-svg-core';

const BorderDirections = ['east', 'south-east', 'south', 'south-west', 'west'] as const;
type BorderDirection = typeof BorderDirections[number];

export default function Window(props: { children: React.ReactNode, title: string, icon?: string, width?: number, height?: number, x?: number, y?: number, moveable?: boolean, scaleable?: boolean }) {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [maxData, setMaxData] = useState<{
        x: number,
        y: number,
        width: number,
        height: number,
    } | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        setWidth((props.width ?? 80) * (window.innerWidth / 100));
        setHeight((props.height ?? 80) * (window.innerHeight / 100));
        setX((props.x ?? (100 - (props.width ?? 80)) / 2) * (window.innerWidth / 100));
        setY((props.y ?? (100 - (props.height ?? 80)) / 2) * (window.innerHeight / 100));
    }, [props.width, props.height, props.x, props.y]);

    function startDragging(header: HTMLDivElement) {
        document.body.style.userSelect = 'none';
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
                if (maxData !== null) {
                    setWidth(maxData.width);
                    setHeight(maxData.height);
                    initialX = originX - maxData.width/2;
                    initialY = originY - 25;
                    setMaxData(null);
                }
                initialized = true;
                return;
            }

            setX(ev.clientX - originX + initialX);
            setY(ev.clientY - originY + initialY);
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.document.body.style.userSelect = '';
            header.style.cursor = 'grab';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    function startScaling(direction: BorderDirection, border: HTMLDivElement) {
        setMaxData(null);
        window.document.body.style.userSelect = 'none';

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
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.document.body.style.userSelect = '';
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    function maximize() {
        if (maxData == null) {
            setMaxData({ x, y, width, height });
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setX(0);
            setY(0);
        } else {
            setWidth(maxData.width);
            setHeight(maxData.height);
            setX(maxData.x);
            setY(maxData.y);
            setMaxData(null);
        }
    }

    if (width === 0) return null; // don't render until window is ready

    return deleted ? (<></>) : (
        <div
            style={{ width: `${width}px`, height: `${height}px`, left: `${x}px`, top: `${y}px` }}
            className={styles.root}
        >
            <div style={(props.moveable ?? true) ? { cursor: 'grab' } : {}}
                onMouseDown={ev => ev.button == 0 && (props.moveable ?? true) && startDragging(ev.currentTarget)}>
                <div></div> {/* Gloss */}
                <div className={styles.header}>
                    <div className={styles.title}>
                        {props.icon !== undefined && <img src={props.icon} />}
                        <p>
                            {props.title}
                        </p>
                    </div>
                    <div className={styles.controls} style={props.icon === undefined ? { marginLeft: '10px' } : {}}>
                        <button className={styles.minimize}><div></div></button>
                        {(props.moveable ?? true) && (props.scaleable ?? true) &&
                            <button className={styles.maximize}
                                onClick={ev => ev.button == 0 && maximize()}><div></div></button>
                        }
                        <button onMouseUp={ev => ev.button == 0 && setDeleted(true)}
                            className={styles.close}>✕</button>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                {BorderDirections.map(direction => (
                    (props.scaleable ?? true) ?
                        <div style={{ cursor: `${direction.split('-').map(x => x.charAt(0)).join('')}-resize` }}
                            onMouseDown={ev => ev.button == 0 && startScaling(direction, ev.currentTarget)}
                            className={styles[`${direction}-border`]}></div>
                        :
                        <div className={styles[`${direction}-border`]}></div>
                ))},
                <div className={styles.content}>{props.children}</div>
            </div>
        </div >
    );
}
