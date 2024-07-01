import styles from './styles.module.scss';

export default function LinkBox({ href, text, icon, className}: { href: string, text: string, icon: string, className?: string}) {
    return <a href={href} className={className + ' ' + styles.container}>
        <img src={icon} />
        <div className={styles.inner}>
            <p className={styles.name}>{text}</p>
            <i className="fa fa-external-link"></i>
        </div>
    </a>
}
