"use client"
import React, { useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'

const PaymentPage = ({ username }) => {
  // const {data: session} = useSession()
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: ""
  })
  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }
  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Buy Me A Chai", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>



      <div className='cover w-full relative'>
        <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/233251/c5f2f693613043ec9dc2529805dc1bb5/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/5.jpg?token-hash=asevgMlIX8oKMvdwEEqztj7xP62EIWlZx0fC0ZSfVVg%3D&token-time=1785801600" alt="" className="object-cover w-full h-[350]" />

        <div className='absolute -bottom-10 right-[48%] border border-white rounded-full'>
          <img width={85} height={85} src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/233251/00c09a848e884d3180dd3dacad265984/eyJoIjoxMDAsInciOjEwMH0%3D/2.jpeg?token-hash=1eh6g430zL82-Ws6dz-dpg4VCvFpvUA591dnSALEsao%3D&token-time=1785196800" alt="" className="rounded-full" />
        </div>
      </div>
      <div className="info flex flex-col items-center my-10 gap-2 ">
        <span className="font-bold text-3xl -translate-x-4 mt-2">
          {username}
        </span>

        <span className="text-slate-400 text-lg -translate-x-4 mt-2">
          Hi !
          I am a professional illustrator specialized in fantasy art, I create illustrations on universes like The Lord of the Rings, Baldur's Gate, Berserk etc...
        </span>

        <span className="text-slate-400 text-lg -translate-x-4 mt-2">
          Welcome, and thank you for your support of my work which guarantees me total autonomy and freedom in my art :)
        </span>
        <div className="payment flex gap-3 w-[80%] mt-10">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className="text-2xl font-bold item mb-5">Supporters</h2>
            <ul className='mx-5 text-'>
              <li className='my-4 flex gap-2 items-center'>
                <img width={35} src="avatar.gif" alt="user avatar" />
                <span>Ben donated <span className='font-bold'>$20</span> with the message "Awesome artwork!!"</span></li>
              <li className='my-4 flex gap-2 items-center'>
                <img width={35} src="avatar.gif" alt="user avatar" />
                <span>Ben donated <span className='font-bold'>$20</span> with the message "Awesome artwork!!"</span></li>
              <li className='my-4 flex gap-2 items-center'>
                <img width={35} src="avatar.gif" alt="user avatar" />
                <span>Ben donated <span className='font-bold'>$20</span> with the message "Awesome artwork!!"</span></li>
            </ul>
          </div>
          <div className="makepayment w-1/2 bg-slate-900 rounded-lg p-10">
            <div className="flex items-center ">
              <h2 className="text-2xl font-bold mb-8">
                Buy me a chai
              </h2>
              <img className="mb-5 relative -top-2.5 invertImg" width={50} src="tea.gif" alt="" />
            </div>
            <div className='flex gap-2 flex-col'>
              {/* input for name and message */}
              <input onChange={handleChange} value={paymentform.name} name='name'
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Name'
              />
              <input onChange={handleChange} value={paymentform.message} name='message'
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Message'
              />
              <input onChange={handleChange} value={paymentform.amount} name='amount'
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Amount'
              />
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Make Payment</button>
            </div>
            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(10000)}>
                Pay ₹100
              </button>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(20000)}>
                Pay ₹200
              </button>
              <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(30000)}>
                Pay ₹300
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
