
const { encrypt } = require('eth-sig-util');

window.p = window.p || {};

window.p.encryptClick = async function encryptClick(){
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable();
  const account = (await web3.eth.getAccounts())[0];
  const key = await window.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [account],
  });

  $('#console').append(`Encryption key: ${key}<br/>`);

  const input = $('#input').val();
  const ecrypted = encrypt(
    key,
    { 'data': input },
    'x25519-xsalsa20-poly1305',
  );
  const ecryptedHex = stringifiableToHex(ecrypted);

  $('#console').append(`Encrypted: ${JSON.stringify(ecrypted)}<br/>`);
  $('#console').append(`Encrypted hex: ${ecryptedHex}<br/>`);
  
  
  const decrypted = await ethereum.request({
    method: 'eth_decrypt',
    params: [ecryptedHex, account],
  });

  $('#console').append(`Decrypted: ${decrypted}<br/>`);

}

function stringifiableToHex (value) {
  return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)))
}