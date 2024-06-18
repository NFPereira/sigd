import React from 'react'
import styles from './styles.module.css'

const Label = ({ name, children }) => {
    return (
        <label>{name}{children}</label>
    )
}

export default Label