let mesh =
{
    meshStart: ffi('int mjsApiSystemMeshStart(void)'),
    setDataEventCallback: ffi('int mjsApiMeshSetDataEventCallback(int (*)(void*, userdata), userdata)'),
    setReliableEventCallback: ffi('int mjsApiMeshReliableStatusEventCallback(int (*)(int, int, userdata), userdata)'),
    reliablePublish: ffi('int mjsApiMeshReliablePublish(int, int, char*, int, int, char*)'),
    reply: ffi('int mjsApiMeshReply(int, char*, char*)'),
    statusReply: ffi('int mjsApiMeshStatusReply(int)'),
    modelCreate: ffi('int mjsApiMeshModelCreate(int, int, char*, char*)'),
    modelAddOpcode: ffi('int mjsApiMeshModelAddOpcode(int, char*)'),
    elementAdd: ffi('int mjsApiMeshElementAdd(int, int)'),
    versionRead: ffi('int mjsApiMeshVersionRead()'),
    versionWrite: ffi('int mjsApiMeshVersionWrite(int)'),
    nodeConfigRead: ffi('int mjsApiMeshNodeConfigRead()'),
    deviceInfoWrite: ffi('int mjsApiMeshDeviceInfoWrite(char*, char*, char*)'),
    deviceInfoRead: ffi('char* mjsApiMeshDeviceInfoRead()'),
    localAddressRead: ffi('char* mjsApiMeshLocalAddrRead()'),
    setBeaconUIDEventCallback: ffi('int mjsApiMeshSetBeaconUIDEventCallback(int (*)(void*, userdata), userdata)'),
    setBeaconURLEventCallback: ffi('int mjsApiMeshSetBeaconURLEventCallback(int (*)(void*, userdata), userdata)'),
    setIBeaconEventCallback: ffi('int mjsApiMeshSetIBeaconEventCallback(int (*)(void*, userdata), userdata)'),

    RELIABLE_TIMEOUT: 1,
    RELIABLE_CANCELLED: 2,

    /** @constant {number} */
    RESULT_OK: 0,
    RESULT_ERROR: -1,

    STATE_EMPTY: 0,
    STATE_MODELS_ELEMENTS_STEP_1: 1, //  Needs one more AT+CPWROFF to be complete
    STATE_MODELS_ELEMENTS_FINISHED: 2,
    STATE_PROVISIONED: 3,
    STATE_CONFIGURED: 4,

    MESH_GENERIC_MODEL_FLAG:  0x80,
    ACCESS_COMPANY_ID_NONE: "\xFF\xFF",

};

/**
* Object holding node composition data
* @typedef {Object} meshNodeData
* @property {string} companyID
* @property {string} productId
* @property {string} versionId
*/

/**
* Object containing the data received by the MeshDataEventCallback.
* @typedef {Object} meshDataEventObject
* @property {int} eventHdl - Handle.
* @property {int} element
* @property {int} model
* @property {int} opCode - opCode identifying the message.
* @property {int} srcAddrType
* @property {int} srcAdr
* @property {int} dstAddrType
* @property {int} dstAdr
* @property {int} ttl
* @property {int} rssi
* @property {int} dataLength
* @property {void} pEventData - Pointer to the data received.
*/

/**
* Object containing the data received by the MeshBeaconUIDEventCallback.
* @typedef {Object} meshBeaconUIDEventObject
* @property {int} txPower
* @property {int} rssi
* @property {void} pBIDNID - Pointer to BID/NID.
*/

/**
* Object containing the data received by the MeshBeaconURLEventCallback.
* @typedef {Object} meshBeaconURLEventObject
* @property {int} txPower
* @property {int} RSSI
* @property {int} urlScheme
* @property {int} urlLength
* @property {void} pURL - Pointer to the URL.
*/

/**
* Object containing the data received by the MeshIBeaconEventCallback.
* @typedef {Object} meshIBeaconEventObject
* @property {int} txPower
* @property {int} major
* @property {int} minor
* @property {void} pUUID - Pointer to the beacon UUID.
*/

let meshEventStructToObject = ffi('void *getDataEventStructDescr(void)')();
let beaconUIDEventStructToObject = ffi('void *getBeaconUIDEventStructDescr(void)')();
let beaconURLEventStructToObject = ffi('void *getBeaconURLEventStructDescr(void)')();
let iBeaconEventStructToObject = ffi('void *getIBeaconEventStructDescr(void)')();

/**
* Starts the Mesh functionality
* @return {int} result
*/
let SystemMeshStart = function () {
    return mesh.meshStart();
};

/**
* Callback object for request to GET a value, a response to an acknowledged SET or a reception of a Status message. Always reply.
* @callback meshDataEventCallback
* @param {void} dataStruct - Data structure returning the event data. Use s2o(dataStruct, meshEventStructToObject) to convert object of type {@link meshDataEventObject}.
* @param {userdata} userdata - Data from the original call.
* @return {void}
*/
let MeshDataEventCallback = function (dataStruct, userdata) { };

/**
* Callback object that is status report to a reliable PUT. Only received when a reliable PUT failed.
* @callback meshReliableEventCallback
* @param {int} reliableID - Identifies the reliable PUT. reliableID was set when the reliable put was issued.
* @param {int} status - Identifies why the reliable PUT failed.
* <br>&nbsp;&nbsp;mesh.RELIABE_TIMEOUT
* <br>&nbsp;&nbsp;mesh.RELIABLE_CANCELLED
* @param {userdata} userdata - Data from the original call.
* @return {void}
*/
let MeshReliableEventCallback = function (reliableID, status,userdata) { };

/**
* Callback object for a Eddystone UID beacon.
* @callback meshBeaconUIDEventCallback
* @param {void} dataStruct - Data structure returning the beacon data. Use s2o(dataStruct, beaconUIDEventStructToObject) to convert object of type {@link meshBeaconUIDEventObject}.
* @param {userdata} userdata - Data from the original call.
* @return {void}
*/
let MeshBeaconUIDEventCallback = function (dataStruct, userdata) { };

/**
* Callback object for a Eddystone URL beacon.
* @callback meshBeaconURLEventCallback
* @param {void} dataStruct - Data structure returning the beacon data. Use s2o(dataStruct, beaconURLEventStructToObject) to convert object of type {@link meshBeaconURLEventObject}.
* @param {userdata} userdata - Data from the original call.
* @return {void}
*/
let MeshBeaconURLEventCallback = function (dataStruct, userdata) { };

/**
* Callback object for a iBeacon beacon
* @callback meshIBeaconEventCallback
* @param {void} dataStruct - Data structure returning the beacon data. Use s2o(dataStruct, iBeaconEventStructToObject) to convert object of type {@link meshIBeaconEventObject}.
* @param {userdata} userdata - Data from the original call.
* @return {void}
*/
let MeshIBeaconEventCallbackBeaconEventCallback = function (dataStruct, userdata) { };

/**
* Set Mesh data event callback.
* @param {meshDataEventCallback} callback -  Function called when mesh data arrives
* @param {userdata} userdata - Data from the original call.
* @return {int} Error Code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshSetDataEventCallback = function (callback, userdata) {
    return mesh.setDataEventCallback(callback, userdata);
};
/**
* Set reliable event callback.
* @param {meshDataEventCallback} callback - Function called when a reliable publish fails
* @param {userdata} userdata - Data from the original call.{string} userdata
* @return {int} Error Code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshSetReliableEventCallback = function (callback, userdata) {
    return mesh.setReliableEventCallback(callback, userdata);
};
/**
* Publish to the publish address.
* @param {int} elementIndex - Index of the element publishing the message.
* @param {int} modelIndex - Index of the model  publishing the message.
* @param {int} opCode - opCode identifying the message.
* @param {string} data - Actual message sent. Empty string if opCode with no data.
* @param {int} dataLength - Length of the data. 0 if opCode with no data.
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshPublish = function (elementIndex, modelIndex, opCode, data, dataLength) {
    return mesh.reliablePublish(elementIndex, modelIndex, "\x04" + opCode + "\x00\x00", 0, 0xFFFF, chr(dataLength) + data);
};
/**
* Reliable publish (SET) to the publish address.
* @param {int} elementIndex - Index of the element publishing the message.
* @param {int} modelIndex - Index of the model publishing the message.
* @param {int} opCode - opCode identifying the message.
* @param {int} replyOpCode - Expected opCode as successful response to the reliable publish.
* @param {int} timeoutTime - How long to wait for the response (seconds)
* @param {int} reliableID - Identifies the reliable publish (PUT) in meshDataEventCallback if failure.<br>0xFFFF reserved for internal use.
* @param {string} data - Actual message sent. Empty string if opCode with no data.
* @param {int} dataLength - Length of the data. 0 if opCode with no data.
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshReliablePublish = function (elementIndex, modelIndex, opCode, replyOpCode, timeoutTime, reliableID, data, dataLength) {
    return mesh.reliablePublish(elementIndex, modelIndex, "\x04" + opCode + replyOpCode, timeoutTime, reliableID, chr(dataLength) + data);
};
/**
* Reply to a message, e.g. a reply to a reliable SET or GET.
* @param {int} eventHandle - Identifies the message to reply to.
* @param {int} elementIndex - Index of the element replying.
* @param {int} modelIndex - Index of the model replying.
* @param {int} opCode - opCode identifying the message.
* @param {string} data - Reply message.
* @param {int} dataLength - Length of the data.
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshReply = function (eventHandle, opCode, data, dataLength) {
    return mesh.reply(eventHandle, "\x02" + opCode, chr(dataLength) + data);
};
/**
* Reply to a STATUS message. Indicate that the message is received.
* @param {int} eventHandle - Identifies the message to reply to.
* @return {int} Error code. 
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshStatusReply = function (eventHandle) {
    return mesh.statusReply(eventHandle);
};

/**
* Read the version number previously written by MeshVersionWrite.
* @return {int} Current version number (>0) or error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshVersionRead = function () {
    return mesh.versionRead();
};
/**
* Write the version number.
* @param {int} versionNumber - Version number
* @return {int} Error code
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshVersionWrite = function (versionNumber) {
    return mesh.versionWrite(versionNumber);
};

/**
* Read the current node config status.
* @return {int}
* <br>&nbsp;&nbsp;mesh.STATE_EMPTY
* <br>&nbsp;&nbsp;mesh.STATE_MODELS_ELEMENTS_STEP_1
* <br>&nbsp;&nbsp;mesh.STATE_MODELS_ELEMENTS_FINISHED
* <br>&nbsp;&nbsp;mesh.STATE_PROVISIONED
* <br>&nbsp;&nbsp;mesh.STATE_CONFIGURED
*/
let MeshNodeConfigRead = function () {
    return mesh.nodeConfigRead();
};

/**
* Create a model and assign a model index to it. The first model created shall use index #0.
* @param {int} modelIndex - 0...
* @param {int} type       - 0: Server, 1: Client
* @param {int} companyId  - 16-bit identifier, e.g. "\x00\x59" ==> 0x0059 Nordic Semi
* @param {int} modelId    - 16-bit identifier
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshModelCreate = function (modelIndex, type, companyId, modelId) {

    return mesh.modelCreate(modelIndex, type, companyId, modelId);
};

/**
* Use a SIG generic model and assign it to a model index. The first model created shall use index #0.
* @param {int} modelIndex - 0...
* @param {int} modelId    - 16-bit identifier for SIG model, e.g. "\x10\x01" ==> 0x1001 Generic ON/OFF client
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshModelGenericCreate = function (modelIndex, modelId) {

    return mesh.modelCreate(modelIndex, mesh.MESH_GENERIC_MODEL_FLAG, mesh.ACCESS_COMPANY_ID_NONE, modelId);
};

/**
* Add an opcode to a user defined model.
* @param {int} modelIndex - 0... (must reference an existing model)
* @param {int} opcode     - 16-bit identifier for an opcode, e.g. "\x00\xD7" ==> 0x00D7
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshModelAddOpcode = function (modelIndex, opcode) {

    return mesh.modelAddOpcode(modelIndex, opcode);
};

/**
* Add an element, referencing a model, to the node. The first element shall use elementIndex #0.
* @param {int} elementIndex - 0...
* @param {int} modelIndex - 0... (must reference to an existing model)
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshElementAdd = function (elementIndex, modelIndex) {

    return mesh.elementAdd(elementIndex, modelIndex);
};

/**
* Define the composition data which identifies the node.
* @param {int} companyId  - 16-bit identifier assigned by Bluetooth SIG, e.g. "\x00\x59" ==> 0x0059 Nordic Semi
* @param {int} productId  - 16-bit identifier, user specified e.g. "\x00\x01" ==> 0x0001
* @param {int} versionId  - 16-bit identifier, user specified e.g. "\x00\x01" ==> 0x0001
* @return {int} Error code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshDeviceInfoWrite = function (companyId, productId, versionId) {
    return mesh.deviceInfoWrite(companyId, productId, versionId);
};

/**
* Read the composition data which identifies the node.
* @return {meshNodeData}
*/
let MeshDeviceInfoRead = function () {
    let deviceInfoStr = mesh.deviceInfoRead();

    return {
        companyId: deviceInfoStr.slice(0,4),
        productId: deviceInfoStr.slice(4,8),
        versionId: deviceInfoStr.slice(8,12),
    }
};

/**
* Read the local address of the node and the number of elements.
* @return {object} With labelled hexadecimal strings localAddr and numberLocalAddr.
*/
let MeshLocalAddressRead = function () {
    let localAddrStr = mesh.localAddressRead();
    
    return {
        localAddr: localAddrStr.slice(0,4),
        numberLocalAddr: localAddrStr.at(4)
    }
};

/**
* Set Eddystone Beacon UID data event callback.
* @param {meshBeaconUIDEventCallback} callback - Function called when beacon data arrives.
* @param {userdata} userdata - Data from the original call.
* @return {int} Error Code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshSetBeaconUIDEventCallback = function (callback, userdata) {
    return mesh.setBeaconUIDEventCallback(callback, userdata);
};

/**
* Set Eddystone Beacon URL event callback.
* @param {meshBeaconURLEventCallback} callback - Function called when beacon data arrives.
* @param {userdata} userdata - Data from the original call.
* @return {int} Error Code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshSetBeaconURLEventCallback = function (callback, userdata) {
    return mesh.setBeaconURLEventCallback(callback, userdata);
};
/**
* Set iBeacon event callback.
* @param {meshIBeaconEventCallback} callback - Function called when beacon data arrives.
* @param {userdata} userdata - Data from the original call.
* @return {int} Error Code.
* <br>&nbsp;&nbsp;mesh.RESULT_OK
* <br>&nbsp;&nbsp;mesh.RESULT_ERROR
*/
let MeshSetIBeaconEventCallback = function (callback, userdata) {
    return mesh.setIBeaconEventCallback(callback, userdata);
};
