import React from 'react'
import styles from './Button.module.scss'

const Button = ({ secondary, disabled, ...restProps }) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${secondary ? styles.secondary : styles.primary}
        ${disabled ? "" : styles[`not-disabled`]}
      `}
      {...restProps}
    />
  )
}


export default Button