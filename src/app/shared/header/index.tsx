import styles from './header.module.css'

export const Header = () => {
    return <>
        <header className={styles.header}>
            <img src="/socotra-logo.svg" alt="Logo" className="logo"/>
        </header>
    </>
}