'use client'
import React, { useState } from 'react'
import styles from './LoginClient.module.scss'
import Button from '@/components/button/Button'
import Link from 'next/link'
import Input from '@/components/input/Input'

const LoginClient = () => {
  const [formData, setFormData] = useState({ email : '', password : ''})

  const handleInputChange = (e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <Input
            email
            id='email'
            name='email'
            label='이메일'
            placeholder='이메일을 입력하세요.'
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input
            password
            id='password'
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력하세요.'
            value={formData.password}
            onChange={handleInputChange}
          />

          <div>

          </div>

          <div className={styles[`btn-filed`]}>
            <Button type='submit'>로그인</Button>
            <Button secondary={true}>
              <Link href={'/sign-in'}>회원가입</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginClient