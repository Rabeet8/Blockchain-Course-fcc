const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config()


async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //connecting to ganache blockchain
    const encryptedjson = fs.readFileSync("./.encryptedKey.json", "utf8")
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedjson,
        process.env.PRIVATE_KEY_PASSWORD
    );
    wallet = await wallet.connect(provider)
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider  );
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying please wait...");
    const contract = await contractFactory.deploy();
    
    
    
    
    
    
    // const transactionReceipt = await contract.deployTransaction.wait(1);
    //only recieve transactionReceipt when you wait a block confirmation
    // console.log("Here is the deployment transaction");
    // console.log(contract.deployTransaction);
    // //initial response of transaction
    // console.log("Here is the transaction receipt");
    // console.log(transactionReceipt)


    // console.log("let's deploy with only trransaction data")
    // const nonce = await wallet.getTransactionCount();
    // const tx = {
    //     nonce: nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 100000,
    //     to: null,
    //     value: 0,
    //     data: "0x608060405234801561001057600080fd5b50610772806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061052b565b60405180910390f35b610094600480360381019061008f919061046e565b61011d565b005b6100b060048036038101906100ab9190610412565b610127565b005b6100cc60048036038101906100c791906103c9565b6101b7565b6040516100d9919061052b565b60405180910390f35b6100fc60048036038101906100f7919061046e565b6101e5565b60405161010a929190610546565b60405180910390f35b6000600154905090565b8060018190555050565b6003604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018d9291906102a1565b505050806002836040516101a19190610514565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600381815481106101f557600080fd5b906000526020600020906002020160009150905080600001549080600101805461021e9061063f565b80601f016020809104026020016040519081016040528092919081815260200182805461024a9061063f565b80156102975780601f1061026c57610100808354040283529160200191610297565b820191906000526020600020905b81548152906001019060200180831161027a57829003601f168201915b5050505050905082565b8280546102ad9061063f565b90600052602060002090601f0160209004810192826102cf5760008555610316565b82601f106102e857805160ff1916838001178555610316565b82800160010185558215610316579182015b828111156103155782518255916020019190600101906102fa565b5b5090506103239190610327565b5090565b5b80821115610340576000816000905550600101610328565b5090565b60006103576103528461059b565b610576565b90508281526020810184848401111561037357610372610705565b5b61037e8482856105fd565b509392505050565b600082601f83011261039b5761039a610700565b5b81356103ab848260208601610344565b91505092915050565b6000813590506103c381610725565b92915050565b6000602082840312156103df576103de61070f565b5b600082013567ffffffffffffffff8111156103fd576103fc61070a565b5b61040984828501610386565b91505092915050565b600080604083850312156104295761042861070f565b5b600083013567ffffffffffffffff8111156104475761044661070a565b5b61045385828601610386565b9250506020610464858286016103b4565b9150509250929050565b6000602082840312156104845761048361070f565b5b6000610492848285016103b4565b91505092915050565b60006104a6826105cc565b6104b081856105d7565b93506104c081856020860161060c565b6104c981610714565b840191505092915050565b60006104df826105cc565b6104e981856105e8565b93506104f981856020860161060c565b80840191505092915050565b61050e816105f3565b82525050565b600061052082846104d4565b915081905092915050565b60006020820190506105406000830184610505565b92915050565b600060408201905061055b6000830185610505565b818103602083015261056d818461049b565b90509392505050565b6000610580610591565b905061058c8282610671565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b6576105b56106d1565b5b6105bf82610714565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062a57808201518184015260208101905061060f565b83811115610639576000848401525b50505050565b6000600282049050600182168061065757607f821691505b6020821081141561066b5761066a6106a2565b5b50919050565b61067a82610714565b810181811067ffffffffffffffff82111715610699576106986106d1565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072e816105f3565b811461073957600080fd5b5056fea2646970667358221220532cf08526016215ad0eb923cbc98f324682118cdaa4f37eaaf3c217b3f7f7aa64736f6c63430008070033",
    //     chainId: 5777,
    // };
    // const sentTxResponse = await wallet.sendTransaction(tx);
    // await sentTxResponse.w  ait(1);
    // console.log(sentTxResponse)



     
    const CurrentFavoriteNumber = await contract.retrieve();
    console.log(`CurrentFavoriteNumber: ${CurrentFavoriteNumber.toString()}`);
    const transactionResponse = await contract.store('7');
    const trasnsactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`updated favorite number is: ${updatedFavoriteNumber}`)
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
})
