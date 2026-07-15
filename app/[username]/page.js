import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
  await connectDb()
  const { username } = await params;
  let u = await User.findOne({ username: username })
  if (!u) {
    return notFound()
  }
  return (
    <>
      <PaymentPage username={username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Buy Me A Chai`,
  }
}