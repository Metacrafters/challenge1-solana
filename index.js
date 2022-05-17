const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    } = require("@solana/web3.js");

    const newPair = new Keypair();
    const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
    const privateKey = newPair._keypair.secretKey;
    

    // console.log("Public Key is: ", publicKey);
    // console.log("Connection string is: ", connection);

    const getWalletBalance = async () => {
        try {

            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            console.log('connection object is:', connection);
            const myWallet = await Keypair.fromSecretKey(privateKey);
            const walletBalance = await connection.getBalance(
                new PublicKey(myWallet.publicKey)
            );
            console.log(`Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL`);
        } catch (err) {
        console.log(err);
        }
    };

    const airDropSol = async () => {
        try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            const myWallet = await Keypair.fromSecretKey(privateKey);

            console.log("Airdropping some SOL to my wallet!");
            
            const fromAirDropSignature = await connection.requestAirdrop(
                new PublicKey(myWallet.publicKey),
                2 * LAMPORTS_PER_SOL
            );

            await connection.confirmTransaction(fromAirDropSignature);
        } catch (err) {
        console.log(err);
        }
    };

    const mainFunction = async () => {
        await getWalletBalance();
        await airDropSol();
        await getWalletBalance();
    }

    mainFunction();
