'use client'
import React from 'react'
import styles from './ProfileClient.module.scss'
import { auth } from '@/firebase/firebase'
import Button from '@/components/button/Button'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const ProfileClient = () => {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      router.replace('/')
    } 
    catch (error) {
      console.log(error);
      toast.error(error?.code);
    }
  }

  return (
    <div>
      
      <Button onClick={onSignOut}>
        로그아웃
      </Button>
    </div>
  )
}

export default ProfileClient