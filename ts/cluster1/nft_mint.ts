import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = await  createNft(
        umi,
        {
            mint,sellerFeeBasisPoints: percentAmount(5),
            name:"Image of a  Rug",
           // uri: "https://devnet.irys.xyz/6aq5L1bJuyFcnPJmwe1wD1mZN2btuJXGssp5fX1LVy45"
            uri: "https://devnet.irys.xyz/8wk3ND1UqQBb91X9swMyQg3exbBtYvY6Wa5R7N7hfy31"
        })
    let result = await tx.sendAndConfirm(umi);
     const signature = base58.encode(result.signature);
    // try1: https://explorer.solana.com/tx/AwSfUmfgCdMVkgao7rJ9aKzYyiKDHPmwLDsfx3NKvq2Trff1o2x75g96sNeyWtvz2LE3ST5EvRo3xinVz7XPfZd?cluster=devnet
    // try2: https://explorer.solana.com/tx/aN4pSvyp4cXNgcpWVevaceFj413WQZUf9fjbyWUmAJxVVHwdAGthu4p4WVDRKLsWZUHe29cTUFWqFf3Jmh8SyFb?cluster=devnet
    // try3:
    //CC3o3ygDaMUwR87kLcpHLkvNKDM5sJFTJoGCqe9jMMfs
    //https://explorer.solana.com/tx/4MRtXmUQzpgxFW8PBd6UkGpvf8r6Q1GMcFKoG8GBqaMYTtsKbAJRbrUBrAGdtcvpaTAEh8w6QWhiPQs945wbM22g?cluster=devnet
     console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    // HD172G5ZyN3uB9X9xVkb6hvZb6597ektkeasQWSZuXhu
    console.log("Mint Address: ", mint.publicKey);
})();