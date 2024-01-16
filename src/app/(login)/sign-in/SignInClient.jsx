'use client'
import React, { useState } from 'react'
import styles from './SignInClient.module.scss'
import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'


const SignInClient = () => {
  const [formData, setFormData] = useState({ email : "", password : "", passwordCheck : ""})
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e)=>{
    const { name, value } = e.target;

    console.log("name : ", name)
    console.log("value : ", value)
    
    setFormData({
      ...formData,
      [name] : value
    });

    if (name === "email") {
      const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      // value 값이 정규 표현식을 통과하지 못하는 경우
      if(!value?.match(validRegex)){
        setError("이메일 형식이 올바르지 않습니다.");
      }
      else {
        setError("");
      }
    }

    if (name === "password") {
      if(value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      }
      else if (formData.passwordCheck?.length > 0 && value !== formData.passwordCheck) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.")
      }
      else {
        setError("");
      }
    }

    if (name === "passwordCheck") {
      if(value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      }
      else if (value !== formData.password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.")
      }
      else {
        setError("");
      }
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입에 성공했습니다.")
      router('/');
    } 
    catch (error) {
      console.log(error);
      toast.error(error?.code);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>회원가입</h2>
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

          <Input
            password
            id='passwordCheck'
            name='passwordCheck'
            label='비밀번호 확인'
            placeholder='확인용 비밀번호를 입력하세요.'
            value={formData.passwordCheck}
            onChange={handleInputChange}
          />

          {
            error && error?.length > 0 && (
              <div className={styles.error}>{error}</div>
            )
          }

          <div className={styles[`btn-filed`]}>
            <Button 
              disabled={error?.length > 0 || formData.email === "" || formData.password === "" || formData.passwordCheck === ""}
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInClient