import React from 'react'
import styles from './styles.module.css'

const Input = ({ type, name, placeholder, disabled, valorSelecionado, onchange, value}) => {
    return (
        <><input disabled={disabled} type={type} name={name} value={value} placeholder={placeholder} className={styles.inputControl} checked={valorSelecionado} onChange={onchange} /></>
    )
}

export default Input