let gatts =
{
    setEventCallback: ffi('int mjsApiGattsSetEventCallback(int (*)(int, int, int, int, char*, userdata), userdata)'),
    createService: ffi('int mjsApiGattsCreateService(char*)'),
    createChar: ffi('int mjsApiGattsCreateCharacteristic(int, char*, int, int, char*, void*)'),
    createDesc: ffi('int mjsApiGattsDesc(int, char*, int, char*)'),
    send: ffi('int mjsApiGattsSend(int, int, int, char*)'),
    writeAttr: ffi('int mjsApiGattsWriteAttribute(int, char*)'),
    readRequestResponse: ffi('int mjsApiGattsReadRequestResponse(int, char*)'),

    EVENT_CONNECTED: 0,
    EVENT_DISCONNECTED: 1,
    EVENT_INDICATION_RESPONSE: 2,
    EVENT_DATA: 3,
    EVENT_READ_REQUSET: 4,

    UUID_TYPE_16: 2,
    UUID_TYPE_128: 16,

    SEND_INDICATION: 1,
    SEND_NOTIFICATION: 2,

    PROPERTY_BROADCAST: 0x01,
    PROPERTY_READ: 0x02,
    PROPERTY_WRITE_NO_RESP: 0x04,
    PROPERTY_WRITE: 0x08,
    PROPERTY_NOTIFY: 0x10,
    PROPERTY_INDICATE: 0x20,
    PROPERTY_WRITE_SIGNED: 0x40,

    SECURITY_READ_NONE: 0x01,
    SECURITY_READ_NON_AUTH: 0x02,
    SECURITY_WRITE_NONE: 0x10,
    SECURITY_WRITE_NON_AUTH: 0x20,

    RESULT_OK: 0,
    RESULT_ERROR: -1,
    RESULT_ERROR_INVALID_UUID: -2,
    RESULT_ERROR_INVALID_DATA_VALUE: -3,
    RESULT_ERROR_INVALID_PROPERTIES: -4,
    RESULT_ERROR_INVALID_SECURITY_PARAM: -5,
};

/**
* Callback object for GATT server events.
* @callback gattsEventCallback
* @param {int} event -
* <br>&nbsp;&nbsp; gatts.EVENT_CONNECTED
* <br>&nbsp;&nbsp; gatts.EVENT_DISCONNECTED
* <br>&nbsp;&nbsp; gatts.EVENT_INDICATION_RESPONSE
* <br>&nbsp;&nbsp; gatts.EVENT_DATA
* <br>&nbsp;&nbsp; gatts.EVENT_READ_REQUSET
* @param {int} connectionHandle - GAP connection that triggered the callback.
* @param {int} attributeHandle - GATT attribute.
* @param {int} dataLength - Length of data written by the client.
* @param {string} clientData - Actual data written by the client.
* @param {any} Userdata - Data from the original call.
* @return {void}
*/
let GattsEventCallback = function (event, connectionHandle, attributeHandle, dataLength, clientData, userdata) { };

/**
* Set GATT event callback.
* @param {gattsEventCallback} callback Function that will be called on all events.
* @param {string} userdata - Identifier when callback is triggered. Can be any type.
* @return {int} Error Code.
* <br>&nbsp;&nbsp; gatts.RESULT_OK
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
*/
let GattsSetEventCallback = function (callback, userdata) {
    return gatts.setEventCallback(callback, userdata);
};

/**
* Create a new GATT service.
* @param {int} uuidType - Type of characteristic UUID.
* <br>&nbsp;&nbsp; gatts.UUID_TYPE_16
* <br>&nbsp;&nbsp; gatts.UUID_TYPE_128
* @param {string} uuid - UUID of service with hexadecimal characters.
* @return {int} non-zero service handle value or error code.
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_UUID
*/
let GattsServiceCreate = function (uuidType, uuid) {
    return gatts.createService(chr(uuidType) + uuid);
};

/**
* Create a new GATT characteristic.
* @param {int} serviceHandle - Handle value of the parent service.
* @param {int} uuidType - Type of characteristic UUID.
* <br>&nbsp;&nbsp; gatts.UUID_TYPE_16
* <br>&nbsp;&nbsp; gatts.UUID_TYPE_128
* @param {string} uuid - UUID of characteristic with hexadecimal characters.
* @param {int} properties - Properties of characteristic. More than one property can be combined.
* <br>&nbsp;&nbsp; gatts.PROPERTY_BROADCAST
* <br>&nbsp;&nbsp; gatts.PROPERTY_READ
* <br>&nbsp;&nbsp; gatts.PROPERTY_WRITE_NO_RESP
* <br>&nbsp;&nbsp; gatts.PROPERTY_WRITE
* <br>&nbsp;&nbsp; gatts.PROPERTY_NOTIFY
* <br>&nbsp;&nbsp; gatts.PROPERTY_INDICATE
* <br>&nbsp;&nbsp; gatts.PROPERTY_WRITE_SIGNED
* @param {int} security - Link layer security requirement of characteristic. Read security and write security should be combined.
* <br>&nbsp;&nbsp; gatts.SECURITY_READ_NONE
* <br>&nbsp;&nbsp; gatts.SECURITY_READ_NON_AUTH
* <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NONE
* <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NON_AUTH
* @param {string} initialValue - Initial value of the characteristic.
* <br>If an empty string is provided, an explicit read authorization request event will be generated for every read by clients.
* @param {int} initialValueLength - Number of bytes of initial value.
* @return {int} Non-zero characteristic value handle or error code.
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_UUID
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_PROPERTIES
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_SECURITY_PARAM<br>
* @return {int} Non-zero characteristic value handle.<br>
* @return {int} Non-zero client characteristic configuration descriptor handle.
*/
let GattsCharacteristicCreate = function (serviceHandle, uuidType, uuid, properties, security, initialValue, initialValueLength) {
    let out = "      ";
    let result = gatts.createChar(serviceHandle, chr(uuidType) + uuid, properties, security, chr(initialValueLength) + initialValue, out);

    let cccdHandle = out.at(1);
    let valueHandle = out.at(0);
    return {
        result: result,
        cccdHandle: cccdHandle,
        valueHandle: valueHandle,
    }
};

/**
* Create a new GATT descriptor.
* @param {int} charHandle - Handle value of the characteristic.
* @param {int} uuidType - Type of descriptor UUID.
* <br>&nbsp;&nbsp; gatts.UUID_TYPE_16
* <br>&nbsp;&nbsp; gatts.UUID_TYPE_128
* @param {string} uuid - UUID of descriptor with hexadecimal characters.
* @param {int} security - Link layer security requirement of characteristic. Read security and write security should be combined.
* <br>&nbsp;&nbsp; gatts.SECURITY_READ_NONE
* <br>&nbsp;&nbsp; gatts.SECURITY_READ_NON_AUTH
* <br>&nbsp;&nbsp; gatts.SECURITY_READ_AUTH
* <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NONE
* <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NON_AUTH
* <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_AUTH
* @param {string} initialValue - Initial value of the descriptor.
* @param {int} initialValueLength - Number of bytes of initial value.
* @return {int} Non-zero descriptor handle or error code.
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_UUID
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_SECURITY_PARAM
*/
let GattsDescriptorCreate = function (charHandle, uuidType, uuid, security, initialValue, initialValueLength) {
    return gatts.createDesc(charHandle, chr(uuidType) + uuid, security, chr(initialValueLength) + initialValue);
};

/**
* Send data to a remote client.
* @param {int} type - Type of packet to send.
* <br>&nbsp;&nbsp; gatts.SEND_INDICATION
* <br>&nbsp;&nbsp; gatts.SEND_NOTIFICATION
* @param {string} connectionHandle - Handle of the GAP connection.
* @param {int} attributeHandle - Handle of the attribute that sends the data.
* @param {string} data - Input data in hex format.
* @param {int} dataLength - Number of bytes of data.
* @return {int} Error code.
* <br>&nbsp;&nbsp; gatts.RESULT_OK
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE
*/
let GattsSend = function (type, connectionHandle, attributeHandle, data, dataLength) {
    return gatts.send(type, connectionHandle, attributeHandle, chr(dataLength) + data);
};

/**
* Write a new value to an attribute without updating remote clients.
* @param {int} attrHandle - Handle value of the attribute.
* @param {string} data - Updated data in hex format.
* @param {int} dataLength - Number of bytes of data.
* @return {int} Error code.
* <br>&nbsp;&nbsp; gatts.RESULT_OK
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE
*/
let GattsWrite = function (attrHandle, data, dataLength) {
    return gatts.writeAttr(attrHandle, chr(dataLength) + data);
};

/**
* Respond to an unsolicited read request event.
* @param {int} connectionHandle - Handle of the GAP connection.
* @param {string} data - Data to be updated.
* @param {int} dataLength - Number of bytes of data.
* @return {int} Error code.
* <br>&nbsp;&nbsp; gatts.RESULT_OK
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR
* <br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE
*/
let GattsReadResp = function (connectionHandle, data, dataLength) {
    return gatts.readRequestResponse(connectionHandle, chr(dataLength) + data);
};
