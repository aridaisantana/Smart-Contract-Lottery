import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-yellow-500">
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Smart Contract Lottery" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="">
        <div className="md:container flex items-center justify-center mx-auto">
          <LotteryEntrance />
        </div>
        <div className="flex mx-auto md:container">
          <Image
            className="rotate-45 invisible sm:visible"
            src="/lottery.png"
            width={612}
            height={518}
          />
          <div className="flex items-center justify-center mx-auto">
            <p className="font-serif mt-10 md:mt-2 ">
              Are you curious about the smart contract behind this?{" "}
              <a
                className="text-blue-600 visited:text-purple-600"
                href="https://rinkeby.etherscan.io/address/0xdfB450f4Db661873C857F38bB24a150c624F8ba8"
              >
                Check it out!
              </a>
            </p>
          </div>
          <div className="flex items-end justify-end mx-auto">
            <Image
              className="-rotate-45 invisible sm:visible"
              src="/lottery.png"
              width={612}
              height={518}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
