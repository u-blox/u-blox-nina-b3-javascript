let bleGap =
{
    discover: ffi('int mjsApiBleGapDiscover(int,int,int)'),
    setDiscoverCallback: ffi('void mjsApiSetBleGapDiscoverCallback(void (*)(char*,int,int,void*,int,userdata),userdata)'),
    setDiscoverComplCallback: ffi('void mjsApiSetBleGapDiscoverComplCallback(void (*)(userdata),userdata)'),
    setAdvData: ffi('int mjsApiBleGapSetAdvertisingData(char*,int,int)'),
    getLocalAddr: ffi('char* mjsApiBleGapGetLocalAddr()'),

    RESULT_OK: 0,
    RESULT_ERROR: -1,

    DISCOVERY_TYPE_ALL: 0,
    DISCOVERY_TYPE_GENERAL: 1,
    DISCOVERY_TYPE_LIMITED: 2,
    DISCOVERY_TYPE_ALL_NO_FILTERING: 3,
	
    DISCOVERY_MODE_ACTIVE: 0,
    DISCOVERY_MODE_PASSIVE: 1,

    ADV_TYPE_ADV: 0,
    ADV_TYPE_ADV_DIRECT: 1,
    ADV_TYPE_ADV_SCAN: 2,
    ADV_TYPE_ADV_NONCONN: 3,
    ADV_TYPE_SCAN_RESPONSE: 4,
};

let discoverCb = 0; // Callback that is used as a workaround since signed integer in callbacks do not work properly

let handleDiscover = function (remoteAddr, advType, rssi, data, dataLen, userdata) {
    discoverCb(remoteAddr, advType, -rssi, data, dataLen, userdata);
};

/**
* Discover BLE devices. Need to use the central role.
* @param {int} type - Discovery type, see DISCOVERY_TYPE_*
* @param {int} mode - Active or passive scan mode see DISCOVERY_MODE_*
* @param {int} timeout - Stop discover devices after this timeout in ms
* @return {int} Result
*/
let BleGapDiscover = function (type, mode, timeout) {
    return bleGap.discover(type, mode, timeout);
};

/**
* Discover callback that is called for each device found.
* @param {string} remoteAddr - Remote address as a string
* @param {int} advType - Advertising type, see ADV_TYPE_*
* @param {int} rssi - Received signal strength
* @param {any} data - Advertising data
* @param {int} dataLen - Advertising data length
* @param {any} userdata - Userdata from the registration
* @return {void}
*/
let BleGapDiscoverCallback = function (remoteAddr, advType, rssi, data, dataLen, userdata) { };

/**
 * Set discover callback.
 *
 * @param {BleGapDiscoverCallback} callback - Callback for received data.
 * @param {any} userdata - Identifier when callback is triggered. Can be any type.
 *
 * @return {int} Result
*/
let BleGapSetDiscoverCallback = function (callback, userdata) {
    discoverCb = callback;
    return bleGap.setDiscoverCallback(handleDiscover, userdata);
};

/**
* Discover callback that is called when finished.
* @param {any} userdata - Userdata from the registration
* @return {void}
*/
let BleGapDiscoverComplCallback = function (userdata) { };

let BleGapSetDiscoverComplCallback = function (callback,userdata) {
    return bleGap.setDiscoverComplCallback(callback,userdata);
};

/**
* Set advertising data. Need to use the peripheral role.
* @param {int} data - Advertising data
* @param {int} length - Length of advertising data
* @param {int} type - Advertising type, see ADV_TYPE_*
* @return {int} result
*/
let BleGapSetAdvData = function (data, length, type) {
    return bleGap.setAdvData(data, length, type);
};

/**
* Returns local Bluetooth address as string.
* @return {string} Bluetooth address as string
*/
let BleGapGetLocalAddr = function () {
    return bleGap.getLocalAddr();
};
