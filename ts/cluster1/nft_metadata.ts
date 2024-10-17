import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
        // https://devnet.irys.xyz/8wk3ND1UqQBb91X9swMyQg3exbBtYvY6Wa5R7N7hfy31

        // try 1:
        // const image = "https://explorer.solana.com/tx/AwSfUmfgCdMVkgao7rJ9aKzYyiKDHPmwLDsfx3NKvq2Trff1o2x75g96sNeyWtvz2LE3ST5EvRo3xinVz7XPfZd?cluster=devnet"
        // try 2:
        // const image = "https://explorer.solana.com/tx/aN4pSvyp4cXNgcpWVevaceFj413WQZUf9fjbyWUmAJxVVHwdAGthu4p4WVDRKLsWZUHe29cTUFWqFf3Jmh8SyFb?cluster=devnet"
         const image = "https://explorer.solana.com/tx/4MRtXmUQzpgxFW8PBd6UkGpvf8r6Q1GMcFKoG8GBqaMYTtsKbAJRbrUBrAGdtcvpaTAEh8w6QWhiPQs945wbM22g?cluster=devnet"
         const metadata = {
             name: "J tapete",
             symbol: "DRJ",
             description: "DRj Description",
             image,
             attributes: [
                 {trait_type: 'color', value: 'red'}
             ],
             properties: {
                 files: [
                     {
                         type: "image/png",
                         uri: image
                     },
                 ]
             },
             creators: []
         };
         const myUri = await  umi.uploader.uploadJson(metadata);
         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
