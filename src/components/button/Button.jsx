import React from 'react'
import styles from './Button.module.scss'

const Button = ({ secondary = false, ...restProps }) => {

  return (
    <button
      className={`${styles.button} ${secondary ? styles.secondary : styles.primary}`}
      {...restProps}
    />
  )
}


export default Button