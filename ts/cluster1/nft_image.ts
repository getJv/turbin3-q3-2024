import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import {readFileSync} from "node:fs";


// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = readFileSync("cluster1/generug.png")
        //2. Convert image to generic file.
        const genericFile = createGenericFile(image,"rug.png")
        //3. Upload image
        const [myuri] = await umi.uploader.upload([genericFile])
        // Uploaded image:  https://arweave.net/6aq5L1bJuyFcnPJmwe1wD1mZN2btuJXGssp5fX1LVy45
        // second image:  https://arweave.net/7FYDmmMgVVDb1U9gerYeY6MVXfr9KJfp5A7pyLZg3sYv
        console.log("Your image URI: ", myuri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
