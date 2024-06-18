import styles from './styles.module.css';

const Titulo = ({ title }) => {
    return (
        <div className={styles.titulo}>{title}</div>
    )
}

export default Titulo