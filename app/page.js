import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center text-white h-[44vh]">
      <div className="font-bold text-3xl">Buy Me a Chai</div>
      <p>
        A crowdfunding platform for creators. Get funded by your fans and followers. Start now!
      </p>
      <div>
        <button>Start Now</button>
      </div>
    </div>
  );
}
