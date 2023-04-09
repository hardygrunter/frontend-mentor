import React from 'react'
import styles from './layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.container}>{children}</section>
  )
}

export default Layout