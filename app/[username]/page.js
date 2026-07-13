import React from 'react'

const Username = ({ params }) => {
  return (
    <>
      <div className='cover w-full relative'>
        <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/233251/c5f2f693613043ec9dc2529805dc1bb5/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/5.jpg?token-hash=asevgMlIX8oKMvdwEEqztj7xP62EIWlZx0fC0ZSfVVg%3D&token-time=1785801600" alt="" className="object-cover w-full h-[350]" />

        <div className='absolute -bottom-10 right-[48%] border border-white rounded-full'>
          <img width={85} height={85} src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/233251/00c09a848e884d3180dd3dacad265984/eyJoIjoxMDAsInciOjEwMH0%3D/2.jpeg?token-hash=1eh6g430zL82-Ws6dz-dpg4VCvFpvUA591dnSALEsao%3D&token-time=1785196800" alt="" className="rounded-full" />
        </div>
      </div>
      <div className="info flex flex-col items-center my-10 gap-2 ">
        <span className="font-bold text-3xl -translate-x-4 mt-2">
          {params.username}
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
              <input
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Name'
              />
              <input
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Message'
              />
              <input
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Amount'
              />
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Make Payment</button>
            </div>
            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 p-3 rounded-lg'>
                Pay $10
              </button>
              <button className='bg-slate-800 p-3 rounded-lg'>
                Pay $20
              </button>
              <button className='bg-slate-800 p-3 rounded-lg'>
                Pay $30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Username
