"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchpayments, initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { fetchuser } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
  // const {data: session} = useSession()
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: ""
  })
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setPayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()


  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        }
        router.push(`/${username}`)
     
    }, [])

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)
    console.log(u, dbpayments)
  }

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      {/* Same as */}
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>



      <div className='cover w-full relative'>
        <img src={currentUser.coverpic} alt="" className="object-cover w-full h-[350]" />

        <div className='absolute -bottom-10 right-[48%] border border-white rounded-full'>
          <img width={85} height={85} src={currentUser.profilepic} alt="" className="rounded-full" />
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
            <ul className='mx-5'>
              {payments.length == 0 && <li>No payments yet</li>}
              {payments.map((p, i) => {
                return <li key={p._id} className='my-4 flex gap-2 items-center'>
                  <img width={35} src="avatar.gif" alt="user avatar" />
                  <span>{p.name} bought you a chai of <span className='font-bold'>₹{p.amount}</span> with the message "{p.message}"</span></li>
              })}
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
              <button onClick={() => pay(paymentform.amount)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:from-blue-500" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3}>Make Payment</button>
            </div>
            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 p-3 rounded-lg disabled:bg-slate-400 disabled:text-black'disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3} onClick={() => pay(100)}>
                Buy a chai of ₹100
              </button>
              <button className='bg-slate-800 p-3 rounded-lg disabled:bg-slate-400 disabled:text-black'disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3} onClick={() => pay(200)}>
                Buy a chai of ₹200
              </button>
              <button className='bg-slate-800 p-3 rounded-lg disabled:bg-slate-400 disabled:text-black'disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3} onClick={() => pay(300)}>
                Buy a chai of ₹300
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
