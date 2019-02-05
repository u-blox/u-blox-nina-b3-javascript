let bleSec =
{
    setPairingMode: ffi('int mjsApiBleSecSetPairingMode(int)'),
    eraseAllPeersReq:ffi('int mjsApiBleSecEraseAllPeersReq(void (*)(int, userdata), userdata)'),

    PAIRING_MODE_DISABLED: 1,
    PAIRING_MODE_ENABLED: 2,

    RESULT_OK: 0,
    RESULT_ERROR: -1,
};

/**
* Enable/Disable Pairing for the device.
* @param {int} pairingMode - BLE Link layer security mode
* <br>&nbsp;&nbsp; bleSec.PAIRING_MODE_DISABLED
* <br>&nbsp;&nbsp; bleSec.PAIRING_MODE_ENABLED
* @return {int} Error code
* <br>&nbsp;&nbsp; bleSec.RESULT_OK
* <br>&nbsp;&nbsp; bleSec.RESULT_ERROR
*/
let BleSecSetPairingMode = function(pairingMode) {
    return bleSec.setPairingMode(pairingMode);
};

/**
* Request to erase all link layer keys and peer information.
* @param {ErasePeersCallback} callback - Callback function
* @param {string} userdata - Identifier when callback is triggered. Can be any type.
* @return {int} Error code
* <br>&nbsp;&nbsp; bleSec.RESULT_OK
* <br>&nbsp;&nbsp; bleSec.RESULT_ERROR
*/
let BleSecEraseAllPeersRequest = function(callback, userdata) {
    return bleSec.eraseAllPeersReq(callback, userdata);
};

/**
* Connection callback that is called after erasing all link layer peer information.
* @callback ErasePeersCallback
* @param {int} result - Status of the erase request
* @param {userdata} userdata - Data from the original call.
* <br>&nbsp;&nbsp; bleSec.RESULT_OK
* <br>&nbsp;&nbsp; bleSec.RESULT_ERROR
* @return {void}
*/
let BleSecEraseAllPeersCallback = function (result, userdata) { };