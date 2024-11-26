import { useEffect } from "react";
import { useStore } from "../../store/store";
import Maker from "@makerdao/dai";
import { McdPlugin } from "@makerdao/dai-plugin-mcd";

export function useMakerDAO() {
  const { state, dispatch } = useStore();
  const { network, account } = state;

  //to do: export api key from url

  useEffect(() => {
    async function getVaults() {
      let vaults = [];
      let proxy = null;
      // const infuraUrl =
      //   "https://" + network + ".infura.io/v3/842298ccc2df48c5bca74c273520dab3";
      // const maker = await Maker.create("http", {
      //   url: infuraUrl,
      //   log: false,
      //   plugins: [McdPlugin]
      // });
      // const manager = maker.service("mcd:cdpManager");
      // const proxy = await maker.service("proxy").getProxyAddress(account);
      // if (proxy) {
      //   const cdps = await manager.getCdpIds(proxy); // returns list of { id, ilk } objects
      //   for (const cdp of cdps) {
      //     const vault = await manager.getCdp(cdp.id);
      //     vaults.push(vault);
      //   }
      // }
      dispatch({ type: "setMaker", maker: { vaults, proxy } });
    }

    if (account && network) {
      getVaults();
    }
  }, [account, network]);
}
