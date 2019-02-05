let stream =
{
    // Generic methods
    create: ffi('int mjsApiStreamCreate(char*, void (*)(int, int, int, void*, userdata), userdata)'),
    connect: ffi('int mjsApiStreamConnect(int)'),
    disconnect: ffi('int mjsApiStreamDisconnect(int)'),
    destroy: ffi('int mjsApiStreamDestroy(int)'),
    status: ffi('int mjsApiStreamStatus(int)'),
    send: ffi('int mjsApiStreamSend(int, int, void*)'),
    getUrl: ffi('int mjsApiStreamGetUrl(int, char*, char*)'),
    // Stream specific methods
    getBtFrameSize: ffi('int mjsApiStreamGetBtFrameSize(int)'), // Only for SPS
    asynchRead: ffi('int mjsApiStreamAsynchRead(int, int)'), // Only for I2C

    getUartId: ffi('int mjsApiStreamGetUartId(void)'),
    getAtId: ffi('int mjsApiStreamGetAtId(void)'),
    getDebugId: ffi('int mjsApiStreamGetDebugId(void)'),

    // Callback events
    CALLBACK_EVENT_CONNECTION: 0,
    CALLBACK_EVENT_DATA_AVAILABLE: 1,
    CALLBACK_EVENT_SEND_COMPLETE: 2,

    // Connection event ids
    CONNECTION_EVT_CONNECTING: 0,
    CONNECTION_EVT_CONNECTED: 1,
    CONNECTION_EVT_DISCONNECTED: 2,
    CONNECTION_EVT_ERROR: 6,

    // Link status callback results
    LINK_RESULT_UNKNOWN: 0,
    LINK_RESULT_DISCONNECTED: 1,
    LINK_RESULT_CONNECTED: 2,

    // Error codes for all API functions
    RESULT_OK: 0,
    RESULT_OK_CONNECTING: -1,
    RESULT_OK_DISCONNECTING: -2,
    RESULT_NO_MORE_STREAM_IDS: -3,
    RESULT_INVALID_ID: -4,
    RESULT_BUSY: -5,
    RESULT_FAILED: -6,
    RESULT_COULD_NOT_ALLOCATE: -7,
};

/**
 * Create a stream. Returns stream ID on success and status when failing.
 * @param {int} url - URL depending on the type of connection
 * <br>&nbsp;&nbsp; Client - Remote URLs
 * <br>&nbsp;&nbsp; If the script acts as a client the URL contains the remote address
 * <br>&nbsp;&nbsp; and can start to setup connection any time with a call to StreamConnect().
 * <br>&nbsp;&nbsp; Note: A remote can be both a wired connection (e.g. a connected sensor)
 * <br>&nbsp;&nbsp; or an SPS (serial port service over BLE) connection over the air.
 * <br>&nbsp;&nbsp;
 * <br>&nbsp;&nbsp; Server - Protocol identifier
 * <br>&nbsp;&nbsp; If the script act as a server and accepts incoming connections, the URL
 * <br>&nbsp;&nbsp; identifies the given protocol. StreamConnect() can only be called after
 * <br>&nbsp;&nbsp; a remote entity tries to connect to this server (as indicated by the
 * <br>&nbsp;&nbsp; CONNECTION_EVT_CONNECTING event).
 * <br>&nbsp;&nbsp;
 * <br>&nbsp;&nbsp; Client URL format
 * <br>&nbsp;&nbsp; The URL has the following format for SPS:
 * <br>&nbsp;&nbsp; "sps://address" for example "sps://78A5042F4ADEp"
 * <br>&nbsp;&nbsp; address - Bluetooth address
 * <br>&nbsp;&nbsp;
 * <br>&nbsp;&nbsp; The URL has the following format/options for I2C:
 * <br>&nbsp;&nbsp; "i2c://port:address/?query_string"
 * <br>&nbsp;&nbsp; For example: "i2c://secondary1:72/?freq=100&read_freq=5000&nr_bytes=2&no_stop=false&init_command=0100&read_command=00&timeout=500"
 * <br>&nbsp;&nbsp; port - The physical port pin pair of the module for I2C data and clock.
 * <br>&nbsp;&nbsp; address - I2C address. Note that this is the 7-bit address. If 8-bit address is used it might need to be converted.
 * <br>&nbsp;&nbsp; query_string - can define the following:
 * <br>&nbsp;&nbsp; read_freq - Value of read frequency in ms. Optional. Default is 0. i.e. no reading in intervals is done.
 * <br>&nbsp;&nbsp; nr_bytes - number of bytes to periodically read. Optional. Default is 0.
 * <br>&nbsp;&nbsp; no_stop - don't send stop bit, true or false. Optional. Default value is false.
 * <br>&nbsp;&nbsp; freq - I2C bus speed, 100 or 400 kHz. Optional. Default value is 100 kHz.
 * <br>&nbsp;&nbsp; init_command - I2C command to run once. Optional. Default is no init command.
 * <br>&nbsp;&nbsp; read_command - I2C command for reading periodically. Must specify nr_bytes if this is used. Optional. Default is no read command.
 * <br>&nbsp;&nbsp; timeout - Timeout in ms for I2C read and write operations. Optional. Default is 1000 ms.
 * <br>&nbsp;&nbsp;
 * <br>&nbsp;&nbsp; Server URL format
 * <br>&nbsp;&nbsp; protocol://protocol, currently only sps://sps supported
 * @param {streamCallback} callback - Callback for all stream related events.
 * @param {any} userdata - Identifier when callback is triggered. Can be any type.
 * @return {int} streamId. Will be zero or positive on success and negative status when failing
 * <br>&nbsp;&nbsp; stream.RESULT_NO_MORE_STREAM_IDS Max number of streams is already reached.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The stream could not be created e.g. bad URL.
 */
let StreamCreate = function (url, callback, userdata) {
    return stream.create(url, callback, userdata);
};

/**
 * Connect a stream. For a client (see StreamCreate()) this may be called at any time and can be immediate
 * (for a local connection) or delayed when synchronization with a remote is required.<br>
 * For a server this shall only be called after receiving CONNECTION_EVT_CONNECTING.<br>
 *
 * Connect may be called multiple times and should in that case return the current status.
 * 
 * @param {int} id - Stream id.
 * @return {int} Result
 * <br>&nbsp;&nbsp; stream.RESULT_OK_CONNECTING The stream is in a negotiation sequence and will be connected once callback with stream.LINK_RESULT_CONNECTED is generated.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The stream failed to connect.
 */
let StreamConnect = function (id) {
    return stream.connect(id);
};

/**
* Stream callback triggered on all stream related events.
* @callback streamCallback
* @param {int} id - Stream id
* @param {int} eventType - Type of callback event, see CALLBACK_EVENT_* above
* @param {int} param - Event specific integer parameter:
* <br>&nbsp;&nbsp; CALLBACK_EVENT_CONNECTION:
* <br>&nbsp;&nbsp; - Connection event id, see CONNECTION_EVT_*
* <br>&nbsp;&nbsp; CALLBACK_EVENT_DATA_AVAILABLE:
* <br>&nbsp;&nbsp; - Data length
* <br>&nbsp;&nbsp; CALLBACK_EVENT_SEND_COMPLETE:
* <br>&nbsp;&nbsp; - Not applicable
* @param {int} data - Event specific data parameter:
* <br>&nbsp;&nbsp; CALLBACK_EVENT_CONNECTION
* <br>&nbsp;&nbsp; - Not applicable
* <br>&nbsp;&nbsp; CALLBACK_EVENT_DATA_AVAILABLE
* <br>&nbsp;&nbsp; - Data
* <br>&nbsp;&nbsp; CALLBACK_EVENT_SEND_COMPLETE
* <br>&nbsp;&nbsp; - Not applicable
* @param {any} userdata Userdata from the original call
* @return {void}
*/
let StreamCallback = function (id, eventType, param, data, userdata) { };

/** 
 * Disconnect a stream.
 *
 * @param {int} id - Stream id.
 *
 * @return {int} Result
 * <br>&nbsp;&nbsp; stream.RESULT_OK The stream is disconnected and can safely be destroyed.
 * <br>&nbsp;&nbsp; stream.RESULT_OK_DISCONNECTING The stream is closing and may yet have outstanding resources.
 *                StreamCallback stream.CALLBACK_EVENT_CONNECTION with stream.LINK_RESULT_DISCONNECTED is generated once fully disconnected.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The stream failed to disconnect.
 */
let StreamDisconnect = function (id) {
    return stream.disconnect(id);
};

/** 
 * Destroy a stream and release all allocated resources.
 *
 * @param {int} id - Stream id.
 *
 * @return {int} Result
 * <br>&nbsp;&nbsp; stream.RESULT_OK The stream is destroyed.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 */
let StreamDestroy = function (id) {
    return stream.destroy(id);
};

/** 
 * Fetch the current connection status of the stream.
 *
 * @param {int} id - Stream id.
 *
 * @return {int} Result
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; Valid connection status of stream, see stream.LINK_RESULT_*
 */
let StreamStatus = function (id) {
    return stream.status(id);
};

/**
 * Send a data packet to a stream. 
 * When the packet has been fully accepted, a callback with stream.CALLBACK_EVENT_SEND_COMPLETE will be generated.
 *
 * @param {int} id - Stream id.
 * @param {int} length - Data packet size.
 * @param {any} data - Data packet to be written.
 *
 * @return {int} Result
 * <br>&nbsp;&nbsp; stream.RESULT_OK The data packet was accepted and will be sent.
 * <br>&nbsp;&nbsp; stream.RESULT_BUSY The stream is currently busy and can't currently process any more data.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; stream.RESULT_COULD_NOT_ALLOCATE Could not allocate data for the stream.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The stream is not in a state that can accept data.
 */
let StreamSend = function(id, length, data) {
    return stream.send(id, length, data);
};

/**
 * Get stream local and remote URL.
 *
 * @param {int} id - Stream id.
 *
 * @return Result - Object with result and URLs
 * <br>&nbsp;&nbsp; stream.RESULT_OK The operation succeeded.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The stream is not in a state where the URL can be retrieved.
*/
let StreamGetUrl = function (id) {
    let remoteUrl = "                                ";
    let localUrl =  "                                ";
    let result = stream.getUrl(id, remoteUrl, localUrl);
    let remoteUrl2 = remoteUrl.slice(1, remoteUrl.at(0)+1);
    let localUrl2 = localUrl.slice(1, localUrl.at(0)+1);
    return {
        result: result,
        remoteUrl: remoteUrl2,
        localUrl: localUrl2,
    }
};

/**
 * Get BT frame size. Only applicable for the SPS stream.
 *
 * @param {int} id - Stream id.
 *
 * @return {int} Result - Frame size on success(> 0) or error when failing.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The operation is not supported or in wrong state.
*/
let StreamGetBtFrameSize = function(id) {
    return stream.getBtFrameSize(id);
};

/**
 * Do an asynchronous read. Only applicable for the I2C stream.
 * The read data will be provided by stream.CALLBACK_EVENT_DATA_AVAILABLE in the callback.
 *
 * @param {int} id - Stream id.
 * @param {int} outdataLength - Number of bytes to read out.
 * @return {int} Result
 * <br>&nbsp;&nbsp; stream.RESULT_OK The operation succeeded.
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.
 * <br>&nbsp;&nbsp; stream.RESULT_FAILED The operation is not supported or in wrong state.
*/
let StreamAsynchRead = function(id, outdataLength) {
    return stream.asynchRead(id, outdataLength);
};

/**
 * Returns the id of the UART stream created by default in non-deployed mode.
 * Use to manipulate the default UART stream.
 * @Note Command will always return stream.RESULT_INVALID_ID in deployed mode
 *
 * @return {int} id or error code
 * <br>&nbsp;&nbsp; 0 or higher: Valid id
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID: No UART stream created from outside script
 */
let StreamGetUartId = function() {
    return stream.getUartId();
};

/**
 * Returns the id of the AT stream created by default in non-deployed mode.
 * Use to manipulate the default AT stream.
 * @Note Command will always return stream.RESULT_INVALID_ID in deployed mode
 *
 * @return {int} id or error code
 * <br>&nbsp;&nbsp; 0 or higher: Valid id
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID: No AT stream created from outside script
 */
let StreamGetAtId = function() {
    return stream.getAtId();
};

/**
 * Returns the id of the debug stream created by default in non-deployed mode.
 * Use to manipulate the default debug stream.
 * @Note Command will always return stream.RESULT_INVALID_ID in deployed mode
 *
 * @return {int} id or error code
 * <br>&nbsp;&nbsp; 0 or higher: Valid id
 * <br>&nbsp;&nbsp; stream.RESULT_INVALID_ID: No debug stream created from outside script
 */
let StreamGetDebugId = function() {
    return stream.getDebugId();
};

