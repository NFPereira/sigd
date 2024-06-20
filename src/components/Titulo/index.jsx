import styles from './styles.module.css';

const Titulo = ({ title, icon }) => {
    return (
        <div className={styles.titulo}>{title}{icon}</div>
    )
}

export default Titulo