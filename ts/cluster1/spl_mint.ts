import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("2nVuSfTkP1DZ9ZWnNuP6GaQrLcc9Q45dGvhNpLjVG4e9");

(async () => {
    try {
        // Create an ATA
         const ata = await getOrCreateAssociatedTokenAccount(
             connection,
             keypair,
             mint,
             keypair.publicKey
         )
         // Your ata is: MZQ3GvRsQ14WPsnQixG4R7RPiD46oVoU75KQGHqM5cK
         console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        // Your mint txid: 3AUVi9taUbY9pnYcXgL6ov3pkfnXAHD4GTceTzpAf3eYNZ74TkfMVsNsPqucN29AfihtCFrLv2BS68fK35YP4fx5
         const mintTx = await mintTo(connection,keypair, mint, ata.address,keypair.publicKey,token_decimals)
         console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
