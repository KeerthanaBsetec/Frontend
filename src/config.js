exports.RPC_URL = "https://sepolia.infura.io/v3/165e1bf150414830abae5b4af6cc9a75"
exports.Mumbai_RPC_URL="https://rpc-mumbai.maticvigil.com/"
exports.admin_PublicKey = "0x5fEF2d28Ff2F3C4b85cCe3C5C816442406C77463"
exports.admin_PrivateKey = "95042112d256afd0bdcf9a2d406678a7ffbb9a3d9501744e877377c6ba4a6829"
//==========L1=================

exports.Gen0 = "0x5AD13Eff2ff0EB640Cd4f58b9bb3A584439Aec7c"
//0x6aFA7DF6324ABc348E1dE99bf4c92E8F55A4d4ff
//0x6Cc79E33dEFc20Be05A5D337706c0AcEA9EFC50D
//0xc790d9eeF3E34fB8C42F0AC3D34E2276E7528cAA
//0x361a8Fe69f53dE6B796361BB75bE3A2FAAa3bCE7
//0x4D4b2F711d1EEb7964938948800958f416f224A9
exports.Gen1 = "0x78e9422133acf08c54673E97930A281e8c75ff9f"

exports.Honr = "0xD1C55Cb6aA5679D0eF79BFAae5BFBABeC0FB2845"

exports.L1NFT = "0x7b1Eab5C26f79348c27ea8B7c5d8fD9AaEFF2B2D"
//0x2e11dCD900cBBb3c17968735AD74b3c94c386482
//0xf8d1DEba2d8F308cE14bc89e90ab87B11Cdc8535
//0x46A8443Aee3AA7011FE1257864b7B0C5AD2A0e55

exports.vault = "0xD7A548D0c842e0FAD936DaC722444Ccf85cd4d36"
//0xfE9F0deD4921A946096Cae406e73BD8717F68fdB
//0xCb64Ac46D66348f9e95fC5feca947944e5834C2d

//==========L2=================
//0x8e7Ca7AFB6c73e9505c23CEbe47da4a3C56f2733
exports.L2NFT = "0xA91c36e643EbDFa09fd5E135FcA2C65B96206B49"
//0xd2Ac2586663fc8F01E0859E597838667c8Bd8560
//0x5EB97fb0B19d4CA14Fc972AD28C82070041d6b09
//0x0C7B9F9b348C03f2184AA73b63D170e5830bBE44
//0xC02dB4Ec3d571963Fe46f29387E5BdB6D55C6e0e
//0x4C7Ed8b0FD6C048a66B9B5b220Bf7a60E721E40D

exports.Quest = "0xF9f04b54DFc609d200a31EDB4B166C26aDe57b83"
//0x7e6f9049e239fB6cDbC1Ef758204Efc3449878E8
//0x0de02BFaa68f3129bCEdB7Ba92CAEb2A2514D2f4
//0xb710a9776B953b7B13079DC019Efe4191F022380
exports.Training = "0xE63fC0A78F13a3cD66CBE76a15F01AbB32D3045E"

const nodeport = 4000;
exports.l2api = {
		stake: `http://localhost:${nodeport}/L2/stake`,
		unstake: `http://localhost:${nodeport}/L2/unstake`,
		Tstake: `http://localhost:${nodeport}/L2/tstake`,
		Tunstake: `http://localhost:${nodeport}/L2/tunstake`,
		mintedtokens:`http://localhost:${nodeport}/L2/mintedtokens`,
		tokenuri: `http://localhost:${nodeport}/L2/tokenuri`,
		signature:`http://localhost:${nodeport}/L2/signatures`,
		claim: `http://localhost:${nodeport}/L2/claim`,
		unstaketoken:`http://localhost:${nodeport}/L2/getunstaketokens`,
}
exports.activityapi = {
	viewdetails:`http://localhost:${nodeport}/activity/getViewdetails`,
	alldetails:`http://localhost:${nodeport}/activity/getAlldetails`
}

//0xcc2d9EBBA9FfD516BaA70DF36A8C652E388E1C6a
//https://staging.crossmint.com/console/overview