exports.RPC_URL = "https://sepolia.infura.io/v3/165e1bf150414830abae5b4af6cc9a75"
exports.Mumbai_RPC_URL="https://rpc-mumbai.maticvigil.com/"
exports.admin_PublicKey = "0x5fEF2d28Ff2F3C4b85cCe3C5C816442406C77463"
exports.admin_PrivateKey = "95042112d256afd0bdcf9a2d406678a7ffbb9a3d9501744e877377c6ba4a6829"
//==========L1=================

exports.Gen0 = "0xff869B0B67F1A3F877399478ae412ee0e9647734"
//0x6aFA7DF6324ABc348E1dE99bf4c92E8F55A4d4ff
//0x6Cc79E33dEFc20Be05A5D337706c0AcEA9EFC50D
//0xc790d9eeF3E34fB8C42F0AC3D34E2276E7528cAA
//0x361a8Fe69f53dE6B796361BB75bE3A2FAAa3bCE7
//0x4D4b2F711d1EEb7964938948800958f416f224A9
exports.Gen1 = "0xDe6330D768303cD029752A09773760471DE73E3E"

exports.Honr = "0x92aDDAd41687f60AB68B991Eab6FE6C77f887bC4"

exports.L1NFT = "0x284EC09C391727110B5Ac0A4E318163cE476FCFA"
//0x2e11dCD900cBBb3c17968735AD74b3c94c386482
//0xf8d1DEba2d8F308cE14bc89e90ab87B11Cdc8535
//0x46A8443Aee3AA7011FE1257864b7B0C5AD2A0e55

exports.vault = "0x9c9DB151Cc90A19Ddc37333188721CcbE138F910"
//0xfE9F0deD4921A946096Cae406e73BD8717F68fdB
//0xCb64Ac46D66348f9e95fC5feca947944e5834C2d

//==========L2=================
//0x8e7Ca7AFB6c73e9505c23CEbe47da4a3C56f2733
exports.L2NFT = "0x93958B5027096344a36C2B3CB5FB4Fc384392508"
//0xd2Ac2586663fc8F01E0859E597838667c8Bd8560
//0x5EB97fb0B19d4CA14Fc972AD28C82070041d6b09
//0x0C7B9F9b348C03f2184AA73b63D170e5830bBE44
//0xC02dB4Ec3d571963Fe46f29387E5BdB6D55C6e0e
//0x4C7Ed8b0FD6C048a66B9B5b220Bf7a60E721E40D

exports.Quest = "0xC0b297E3C09522854C4CB2de7B79339542762Da2"
//0x7e6f9049e239fB6cDbC1Ef758204Efc3449878E8
//0x0de02BFaa68f3129bCEdB7Ba92CAEb2A2514D2f4
//0xb710a9776B953b7B13079DC019Efe4191F022380
exports.Training = "0x83B634F2A481adD1771EA3DbE745E39CfBe983b4"
exports.L1Claim = "0x94C678685Ec440d18AB27bde1AE2d2F5A2f6aC4C"

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