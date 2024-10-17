import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("2nVuSfTkP1DZ9ZWnNuP6GaQrLcc9Q45dGvhNpLjVG4e9");

// my second dev key
// Recipient address
const to = new PublicKey("4Eq37WEsSbD2EzC8uqiHm52v3C8xmc6PzD3oC4L5uRMT");


(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toWallet = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        const tx = await transfer(
            connection,
            keypair,
            fromWallet.address,
            toWallet.address,
            keypair,
            1
        );
        // DONE: https://explorer.solana.com/tx/5QyvcB4kAhzUdDUHdxAyiMMD4ZPPUL3efRj8PSBxGtMrRqEXutvnHTeyA9y9UY9ZXtG9ywX7x41r9m6c4iXmQ4DD?cluster=devnet
        console.log(
            `1 token to acc at ${toWallet.address}. Tx: ${tx}`
        );

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();