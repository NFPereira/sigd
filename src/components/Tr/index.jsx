import React from 'react'
import styles from './styles.module.css';

const Tr = ({onclick, children }) => {
    return (
        <tr onClick={onclick}>{children}</tr>
    )
}

export default Tr