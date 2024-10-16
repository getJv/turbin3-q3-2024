import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import bs58 from "bs58";

// Define our Mint address
const mint = publicKey("2nVuSfTkP1DZ9ZWnNuP6GaQrLcc9Q45dGvhNpLjVG4e9")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
         let accounts: CreateMetadataAccountV3InstructionAccounts = {
             mint: mint,
             mintAuthority: signer,
             updateAuthority: signer,
         }

         let data: DataV2Args = {
             name: "http.pizza",
             symbol: "htp",
             uri: "https://http.pizza/",
             sellerFeeBasisPoints: 0,
             creators: null,
             collection: null,
             uses: null,

         }

         let args: CreateMetadataAccountV3InstructionArgs = {
             data: data,
             isMutable: true,
             collectionDetails: null,
         }

         let tx = createMetadataAccountV3(
             umi,
             {
                 ...accounts,
                 ...args
             }
         )


        let result = await tx.sendAndConfirm(umi);
        // 3VEG6mcbjLwrpi5MTD96tADaPrdZ99wFAxC33ifZ5sYXV82NN5UPeFQJJzmGXq6pwKVTCZ2S6bfxz5i8kd2ueTrd
        const decodedSignature = bs58.encode(result.signature)
        console.log(decodedSignature);
        //https://explorer.solana.com/tx/3VEG6mcbjLwrpi5MTD96tADaPrdZ99wFAxC33ifZ5sYXV82NN5UPeFQJJzmGXq6pwKVTCZ2S6bfxz5i8kd2ueTrd?cluster=devnet
        console.log(
            `Success! Metadata created at https://explorer.solana.com/tx/${decodedSignature}?cluster=devnet`
        );



    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
