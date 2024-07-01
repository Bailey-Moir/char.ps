import styles from './styles.module.scss';
import './styles.scss';
import LinkBox from '../components/link-box';

export default function Page() {
    return <div className={styles.links}>
        <LinkBox href="https://github.com/Bailey-Moir/" text="Github" icon="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" />    
        <LinkBox href="https://www.upwork.com/freelancers/~01115c08d3953297a7?viewMode=1" text="Upwork" icon="https://yt3.googleusercontent.com/Rt0a-mNaBF7D9fzrf0sHhbJr0PZT0nftaII_lWzWJ1Oqnj20ovwsKEMmlQfq-H1pm8kgFBwDDag=s900-c-k-c0x00ffffff-no-rj" />    
        <LinkBox href="https://open.spotify.com/user/bpmpop" text="Spotify" icon="https://yt3.googleusercontent.com/vuOdWtsiJ02ciel4pqaheZbl3SJx5uP5xu_xJlAilwFRKsvYjZqHGiIGvZxWKVHIEHvVRhQctrc=s900-c-k-c0x00ffffff-no-rj" />    
    </div>
}
