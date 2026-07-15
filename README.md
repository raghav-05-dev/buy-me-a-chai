# ☕ Buy Me a Chai

A crowdfunding / tipping platform for creators — built with Next.js. Fans can visit a creator's public page and send them a one-time payment ("buy them a chai") along with a name and a message, powered by Razorpay for real payment processing.

## ✨ Features

**🔑 Sign in with a single click**
No passwords, no forms — creators log in with GitHub through NextAuth. The very first login quietly provisions a MongoDB profile behind the scenes, seeding a starter username from their email so they're never dropped into an empty state.

**🎨 A dashboard that's actually theirs**
A dedicated Dashboard lets every creator make the page feel like home — name, email, username, profile picture, cover photo — plus the one field that matters most: their *own* Razorpay Key ID and Secret. That's the detail that turns this from a demo into a real payments app: money never passes through a shared account, it goes straight to the creator who earned it.

**📣 A public page built to be shared**
Every creator gets a clean, personal link at `/username` — think of it as their storefront. It shows off a cover photo and avatar, tallies up the total raised in real time, and spotlights a "Top Supporters" leaderboard so generosity gets noticed.

**☕ Tipping, reimagined as chai**
Fans don't "donate" — they buy a chai. A simple form (name, a short message, an amount) feeds straight into Razorpay's Checkout widget, with ₹100 / ₹200 / ₹300 one-tap shortcuts for anyone who doesn't want to type a number.

**🔒 Payments you can actually trust**
Nothing is marked "paid" just because the checkout modal closed. Every transaction is created as a *pending* order first, and only flipped to complete after the backend independently re-verifies Razorpay's cryptographic signature — closing the door on faked or tampered payment confirmations.

**🔔 Feedback that feels alive**
Toast pop-ups (via `react-toastify`) confirm the moments that matter — "Thanks for your donation!" after a successful chai, "Profile Updated" after a dashboard save — so the app never leaves users guessing.

**📖 A story, not just a landing page**
An About page walks visitors through the *why* of crowdfunding for creators, while the homepage pairs a punchy hero section with an embedded explainer video for anyone who wants the pitch in 90 seconds.

## 🧱 Tech Stack

| Layer | Technology | Purpose in this project |
|---|---|---|
| Framework | [Next.js 15](https://nextjs.org/) | App Router, Server Actions, and Route Handlers power the whole app |
| UI Library | [React 19](https://react.dev/) | Component-based UI (client + server components) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling across every page and component |
| CSS Tooling | [PostCSS](https://postcss.org/) + [Autoprefixer](https://github.com/postcss/autoprefixer) | Processes Tailwind's output and adds vendor prefixes |
| Authentication | [NextAuth.js / Auth.js v5](https://authjs.dev/) | GitHub OAuth login, session management, sign-in callbacks |
| Database | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) | Stores `User` and `Payment` documents |
| Payments | [Razorpay](https://razorpay.com/) (Orders API, Checkout.js, `razorpay-utils` signature verification) | Creates orders, renders the checkout widget, verifies payments server-side |
| Notifications | [react-toastify](https://fkhadra.github.io/react-toastify/) | Toast messages for payment success and profile updates |
| Fonts | [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Geist, Geist Mono) | Optimized, self-hosted font loading |
| Scripts | [`next/script`](https://nextjs.org/docs/app/api-reference/components/script) | Loads the Razorpay Checkout.js SDK client-side |
| Linting | ESLint + `eslint-config-next` | Code quality and Next.js best practices |
| Package Management | npm | Dependency management (`package.json` / `package-lock.json`) |

## 🔧 How It Works

1. **Sign in** — A creator logs in with GitHub. On first login, `authOptions.callbacks.signIn` (in `app/api/auth/[...nextauth]/route.js`) checks MongoDB for an existing user by email and creates a new `User` document if none exists, using the email prefix as the default username.
2. **Set up a profile** — From `/dashboard`, the creator fills in their name, username, profile/cover picture URLs, and their personal Razorpay API Key ID and Secret. This is handled by the `updateProfile` server action in `actions/useractions.js`.
3. **Share the page** — Every creator gets a public page at `/{username}` (`app/[username]/page.js`), rendered by the `PaymentPage` component. If the username doesn't exist, Next.js returns a 404 via `notFound()`.
4. **A fan sends support** — On the creator's page, a fan enters their name, a message, and an amount, then clicks "Make Payment" (or a quick-amount button). This calls the `initiate` server action, which creates a Razorpay order using the *creator's* Razorpay credentials and stores a pending `Payment` document (`oid`, amount, sender name/message, `done: false`).
5. **Checkout** — The Razorpay Checkout widget opens client-side using the order ID returned from step 4.
6. **Verification & completion** — After payment, Razorpay calls back to `POST /api/razorpay`, which looks up the pending payment by order ID, verifies the payment signature using the creator's Razorpay secret, and — if valid — marks the `Payment` as `done: true` and redirects the fan back to the creator's page with a success flag, triggering a "Thanks for your donation!" toast. The creator's "Top Supporters" list and total raised are recalculated from completed payments (`fetchpayments`, sorted by amount, top 7).

## 📁 Project Structure

```
├── actions/
│   └── useractions.js        # Server actions: initiate payment, fetch user/payments, update profile
├── app/
│   ├── [username]/page.js    # Public creator support page
│   ├── about/page.js         # About/marketing page
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js   # NextAuth config (GitHub provider, callbacks)
│   │   └── razorpay/route.js             # Payment verification webhook/callback
│   ├── dashboard/page.js     # Creator dashboard route
│   ├── layout.js             # Root layout (Navbar, Footer, SessionProvider)
│   └── page.js                # Landing page
├── components/
│   ├── Dashboard.js           # Profile editing form
│   ├── Navbar.js / Footer.js  # Layout components
│   ├── PaymentPage.js         # Creator page UI + Razorpay checkout logic
│   └── SessionWrapper.js      # NextAuth SessionProvider wrapper
├── db/
│   └── connectDb.js           # Mongoose/MongoDB connection helper
└── models/
    ├── User.js                # User schema (email, username, pics, Razorpay keys)
    └── Payment.js              # Payment schema (amount, sender, message, status)
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- A MongoDB database (local or Atlas)
- A GitHub OAuth App (for login)
- A Razorpay account (for payments)

### Installation

```bash
git clone https://github.com/raghav-05-dev/buy-me-a-chai.git
cd buy-me-a-chai
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
NEXTAUTH_SECRET=a_random_secret_string
NEXT_PUBLIC_URL=http://localhost:3000
```

Each creator also enters their own Razorpay Key ID and Secret from their dashboard — these aren't set as global environment variables since payments are routed to individual creators.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📜 License

No license specified.
