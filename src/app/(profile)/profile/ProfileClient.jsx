'use client'
import React from 'react'
import styles from './ProfileClient.module.scss'
import { auth } from '@/firebase/firebase'
import Button from '@/components/button/Button'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { SET_ALL_RESET } from '@/redux/slice/bookmarkSlice'

const ProfileClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      router.replace('/');
      dispatch(SET_ALL_RESET());
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