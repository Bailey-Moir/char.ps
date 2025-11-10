'use client';
import Window from './components/window';
import './styles.scss';

export default function Page() {
    return <Window title="Welcome!" icon="info.png" width={20} height={20}>
        Hello! Welcome to my website. Please use the desktop-shortcuts to navigate.
    </Window>;
}
