'use client'
import React, { useState } from 'react'
import styles from './SignInClient.module.scss'
import Button from '@/components/button/Button'
import Input from '@/components/input/Input'

const SignInClient = () => {
  const [formData, setFormData] = useState({ email : '', password : '', passwordCheck : ''})

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
        <h2 className={styles.title}>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <Input
            email
            icon='letter'
            id='email'
            name='email'
            label='이메일'
            placeholder='이메일을 입력하세요.'
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input
            password
            icon='lock'
            id='password'
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력하세요.'
            value={formData.password}
            onChange={handleInputChange}
          />

          <Input
            password
            icon='lock'
            id='password'
            name='password'
            label='비밀번호 확인'
            placeholder='확인용 비밀번호를 입력하세요.'
            value={formData.passwordCheck}
            onChange={handleInputChange}
          />

          <div>
            
          </div>

          <div className={styles[`btn-filed`]}>
            <Button>회원가입</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInClient