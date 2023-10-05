import { log, ipfs, json, JSONValue } from "@graphprotocol/graph-ts";
import {
  BoredApe as BaycTokenContract,
  Transfer as TransferEvent,
} from "../generated/BoredApe/BoredApe";
import { BoredApeToken, BoredApeUser } from "../generated/schema";

// 简单起见 我们只处理 Transfer 事件
// We only deal with the Transfer event for simplicity
export function handleTransfer(event: TransferEvent): void {
  /**
   * load ipfs of bayc
   * Source: https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d#readContract
   */
  let baseHash = "QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq";
  let fullIPFSURI = "ipfs.io/ipfs/" + baseHash + "/";

  /**
   * 如果BAYC Token已经存在 则加载BAYC实体 否则生成新的BAYC实体实例
   * load BAYC entity if it exists otherwise generate a new BAYC entity instance
   **/
  let entityToken = BoredApeToken.load(event.params.tokenId.toString());
  if (!entityToken) {
    entityToken = new BoredApeToken(event.params.tokenId.toString());
    entityToken.tokenID = event.params.tokenId;
    entityToken.createdAtTimestamp = event.block.timestamp;
  }

  const baycTokenContractInstance = BaycTokenContract.bind(event.address);
  let baseURI = baycTokenContractInstance.baseURI();
  //  output - ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/10
  let contentURI = baycTokenContractInstance.tokenURI(event.params.tokenId);

  /**
   * rerouting to other dns link
   **/
  if (baseURI.includes("https")) {
    if (baseURI.includes("https")) {
      baseURI = fullIPFSURI;
    } else if (baseURI.includes("ipfs")) {
      let hash = baseURI.split("ipfs://").join("");
      baseURI = "ipfs.io/ipfs" + hash;
    }

    if (contentURI.includes("https")) {
      contentURI = fullIPFSURI + event.params.tokenId.toString();
    } else {
      let hash = contentURI.split("ipfs://").join("");
      contentURI = "ipfs.io/ipfs/" + hash + event.params.tokenId.toString();
    }

    /** Setting the content and base URI */
    entityToken.contentURI = contentURI;

    entityToken.owner = event.params.to.toHexString();
    entityToken.save();

    /**
     * load the BAYC user if it exists other wise generate new BAYC entity instance
     * can also use event.params.id.toHex()
     **/
    let entityUser = BoredApeUser.load(event.params.to.toHexString());
    if (!entityUser) {
      entityUser = new BoredApeUser(event.params.to.toHexString());
    }
    entityUser.save();
  }
}
