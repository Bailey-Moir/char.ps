import styles from './styles.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";


export default function LinkBox({ href, text, icon, className, white}: { href: string, text: string, icon: string, className?: string, white?: boolean}) {
    return <a href={href} className={className + ' ' + styles.container}>
        <div className={styles.cropper} style={ white ? {'background': 'white'} : {}}>
            <img src={icon} />
        </div>
        <div className={styles.inner}>
            <p className={`${styles.name} font-mono`}>
                {text}
            </p>
            <FontAwesomeIcon icon={faExternalLink} className="fas fa-external-link"></FontAwesomeIcon>
        </div>
    </a>
}
