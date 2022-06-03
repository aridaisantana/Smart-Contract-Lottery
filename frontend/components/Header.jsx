import { ConnectButton } from "web3uikit";

const Header = () => {
  return (
    <div className="px-12 py-5 border-b-2 flex justify-between items-center">
      <h1 className="px-4 font-blog text-3xl">Decentralized Lottery</h1>
      <ConnectButton moralisAuth={false} />
    </div>
  );
};

export default Header;
