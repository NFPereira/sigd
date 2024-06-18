import React from 'react'
import styles from './styles.module.css'

const Table = ({ children }) => {
    return (
        <table className={styles.tabela}>{children}</table>
    )
}

export default Table