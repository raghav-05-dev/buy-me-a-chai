// import NextAuth from 'next-auth';
// // import AppleProvider from 'next-auth/providers/apple'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import GoogleProvider from 'next-auth/providers/google'
// // import EmailProvider from 'next-auth/providers/email'
// import GitHubProvider from "next-auth/providers/github";

// export const authoptions = NextAuth({
//     providers: [
//         // OAuth authentication providers...
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET
//         }),
//         // AppleProvider({
//         //     clientId: process.env.APPLE_ID,
//         //     clientSecret: process.env.APPLE_SECRET
//         // }),
//         // FacebookProvider({
//         //     clientId: process.env.FACEBOOK_ID,
//         //     clientSecret: process.env.FACEBOOK_SECRET
//         // }),
//         // GoogleProvider({
//         //     clientId: process.env.GOOGLE_ID,
//         //     clientSecret: process.env.GOOGLE_SECRET
//         // }),
//         // Passwordless / email sign in
//         // EmailProvider({
//         //     server: process.env.MAIL_SERVER,
//         //     from: 'NextAuth.js <no-reply@example.com>'
//         // }),
//     ],
// })

//  export { authoptions as GET, authoptions as POST}

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectDb from "@/db/connectDb";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import Email from "next-auth/providers/email";

export const authOptions = {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],

    // Paste callbacks here
    // callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         if (account.provider == "github") {
    //             const client = await mongoose.connect("mongodb://localhost:27017/chai")
    //             // const currentUser = User.findOne({ email: email })
    //             const currentUser = await User.findOne({
    //                 email: user.email
    //             })

    //             if (!currentUser) {
    //                 const newUser = new User({
    //                     // email: email,
    //                     // username: email.split("@")[0],
    //                     email: user.email,
    //                     username: user.email.split("@")[0],
    //                 })
    //                 await newUser.save()
    //                 user.name = newUser.username
    //             }
    //             else {
    //                 // user.name = newUser.username
    //                 user.name = currentUser.username
    //             }
    //         }
    //         return true
    //     },
    // },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if(account.provider == "github") { 
          await connectDb()
          // Check if the user already exists in the database
          const currentUser =  await User.findOne({email: email}) 
          if(!currentUser){
            // Create a new user
             const newUser = await User.create({
              email: user.email, 
              username: user.email.split("@")[0], 
            })   
          } 
          return true
         }
      },
      
      async session({ session, user, token }) {
        const dbUser = await User.findOne({email: session.user.email})
        session.user.name = dbUser.username
        return session
      },
    }, 

    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers: { GET, POST } } = NextAuth(authOptions);