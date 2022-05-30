import { ConnectButton } from "web3uikit";

const Header = () => {
  return (
    <div>
      Decentralized Loterry
      <ConnectButton moralisAuth={false} />
    </div>
  );
};

export default Header;
