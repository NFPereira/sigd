import React from 'react'
import styles from './styles.module.css'

const Input = ({id, type, name, placeholder, disabled, valorSelecionado, onchange, value, max}) => {
    return (
        <><input id={id} maxLength={max} disabled={disabled} type={type} name={name} value={value} placeholder={placeholder} className={styles.inputControl} checked={valorSelecionado} onChange={onchange} /></>
    )
}

export default Input