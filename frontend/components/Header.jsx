import { ConnectButton } from "web3uikit";

const Header = () => {
  return (
    <div className="px-12 py-5 flex justify-around items-center  ">
      <h1 className="font-extrabold px-4 font-blog md:text-3xl text-white">
        Decentralized Lottery
      </h1>
      <ConnectButton moralisAuth={false} />
    </div>
  );
};

export default Header;
