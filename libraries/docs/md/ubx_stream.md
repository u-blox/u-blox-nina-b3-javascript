## Functions

<dl>
<dt><a href="#StreamCreate">StreamCreate(url, callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Create a stream. Returns stream ID on success and status when failing.</p>
</dd>
<dt><a href="#StreamConnect">StreamConnect(id)</a> ⇒ <code>int</code></dt>
<dd><p>Connect a stream. For a client (see StreamCreate()) this may be called at any time and can be immediate
(for a local connection) or delayed when synchronization with a remote is required.<br>
For a server this shall only be called after receiving CONNECTION_EVT_CONNECTING.<br></p>
<p>Connect may be called multiple times and should in that case return the current status.</p>
</dd>
<dt><a href="#StreamDisconnect">StreamDisconnect(id)</a> ⇒ <code>int</code></dt>
<dd><p>Disconnect a stream.</p>
</dd>
<dt><a href="#StreamDestroy">StreamDestroy(id)</a> ⇒ <code>int</code></dt>
<dd><p>Destroy a stream and release all allocated resources.</p>
</dd>
<dt><a href="#StreamStatus">StreamStatus(id)</a> ⇒ <code>int</code></dt>
<dd><p>Fetch the current connection status of the stream.</p>
</dd>
<dt><a href="#StreamSend">StreamSend(id, length, data)</a> ⇒ <code>int</code></dt>
<dd><p>Send a data packet to a stream. 
When the packet has been fully accepted, a callback with stream.CALLBACK_EVENT_SEND_COMPLETE will be generated.</p>
</dd>
<dt><a href="#StreamGetUrl">StreamGetUrl(id)</a> ⇒</dt>
<dd><p>Get stream local and remote URL.</p>
</dd>
<dt><a href="#StreamGetBtFrameSize">StreamGetBtFrameSize(id)</a> ⇒ <code>int</code></dt>
<dd><p>Get BT frame size. Only applicable for the SPS stream.</p>
</dd>
<dt><a href="#StreamAsynchRead">StreamAsynchRead(id, outdataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Do an asynchronous read. Only applicable for the I2C stream.
The read data will be provided by stream.CALLBACK_EVENT_DATA_AVAILABLE in the callback.</p>
</dd>
<dt><a href="#StreamGetUartId">StreamGetUartId()</a> ⇒ <code>int</code></dt>
<dd><p>Returns the id of the UART stream created by default in non-deployed mode.
Use to manipulate the default UART stream.</p>
</dd>
<dt><a href="#StreamGetAtId">StreamGetAtId()</a> ⇒ <code>int</code></dt>
<dd><p>Returns the id of the AT stream created by default in non-deployed mode.
Use to manipulate the default AT stream.</p>
</dd>
<dt><a href="#StreamGetDebugId">StreamGetDebugId()</a> ⇒ <code>int</code></dt>
<dd><p>Returns the id of the debug stream created by default in non-deployed mode.
Use to manipulate the default debug stream.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#streamCallback">streamCallback</a> ⇒ <code>void</code></dt>
<dd><p>Stream callback triggered on all stream related events.</p>
</dd>
</dl>

<a name="StreamCreate"></a>

## StreamCreate(url, callback, userdata) ⇒ <code>int</code>
Create a stream. Returns stream ID on success and status when failing.

**Kind**: global function  
**Returns**: <code>int</code> - streamId. Will be zero or positive on success and negative status when failing<br>&nbsp;&nbsp; stream.RESULT_NO_MORE_STREAM_IDS Max number of streams is already reached.<br>&nbsp;&nbsp; stream.RESULT_FAILED The stream could not be created e.g. bad URL.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>int</code> | URL depending on the type of connection <br>&nbsp;&nbsp; Client - Remote URLs <br>&nbsp;&nbsp; If the script acts as a client the URL contains the remote address <br>&nbsp;&nbsp; and can start to setup connection any time with a call to StreamConnect(). <br>&nbsp;&nbsp; Note: A remote can be both a wired connection (e.g. a connected sensor) <br>&nbsp;&nbsp; or an SPS (serial port service over BLE) connection over the air. <br>&nbsp;&nbsp; <br>&nbsp;&nbsp; Server - Protocol identifier <br>&nbsp;&nbsp; If the script act as a server and accepts incoming connections, the URL <br>&nbsp;&nbsp; identifies the given protocol. StreamConnect() can only be called after <br>&nbsp;&nbsp; a remote entity tries to connect to this server (as indicated by the <br>&nbsp;&nbsp; CONNECTION_EVT_CONNECTING event). <br>&nbsp;&nbsp; <br>&nbsp;&nbsp; Client URL format <br>&nbsp;&nbsp; The URL has the following format for SPS: <br>&nbsp;&nbsp; "sps://address" for example "sps://78A5042F4ADEp" <br>&nbsp;&nbsp; address - Bluetooth address <br>&nbsp;&nbsp; <br>&nbsp;&nbsp; The URL has the following format/options for I2C: <br>&nbsp;&nbsp; "i2c://port:address/?query_string" <br>&nbsp;&nbsp; For example: "i2c://secondary1:72/?freq=100&read_freq=5000&nr_bytes=2&no_stop=false&init_command=0100&read_command=00&timeout=500" <br>&nbsp;&nbsp; port - The physical port pin pair of the module for I2C data and clock. <br>&nbsp;&nbsp; address - I2C address. Note that this is the 7-bit address. If 8-bit address is used it might need to be converted. <br>&nbsp;&nbsp; query_string - can define the following: <br>&nbsp;&nbsp; read_freq - Value of read frequency in ms. Optional. Default is 0. i.e. no reading in intervals is done. <br>&nbsp;&nbsp; nr_bytes - number of bytes to periodically read. Optional. Default is 0. <br>&nbsp;&nbsp; no_stop - don't send stop bit, true or false. Optional. Default value is false. <br>&nbsp;&nbsp; freq - I2C bus speed, 100 or 400 kHz. Optional. Default value is 100 kHz. <br>&nbsp;&nbsp; init_command - I2C command to run once. Optional. Default is no init command. <br>&nbsp;&nbsp; read_command - I2C command for reading periodically. Must specify nr_bytes if this is used. Optional. Default is no read command. <br>&nbsp;&nbsp; timeout - Timeout in ms for I2C read and write operations. Optional. Default is 1000 ms. <br>&nbsp;&nbsp; <br>&nbsp;&nbsp; Server URL format <br>&nbsp;&nbsp; protocol://protocol, currently only sps://sps supported |
| callback | [<code>streamCallback</code>](#streamCallback) | Callback for all stream related events. |
| userdata | <code>any</code> | Identifier when callback is triggered. Can be any type. |

<a name="StreamConnect"></a>

## StreamConnect(id) ⇒ <code>int</code>
Connect a stream. For a client (see StreamCreate()) this may be called at any time and can be immediate(for a local connection) or delayed when synchronization with a remote is required.<br>For a server this shall only be called after receiving CONNECTION_EVT_CONNECTING.<br>Connect may be called multiple times and should in that case return the current status.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; stream.RESULT_OK_CONNECTING The stream is in a negotiation sequence and will be connected once callback with stream.LINK_RESULT_CONNECTED is generated.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; stream.RESULT_FAILED The stream failed to connect.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |

<a name="StreamDisconnect"></a>

## StreamDisconnect(id) ⇒ <code>int</code>
Disconnect a stream.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; stream.RESULT_OK The stream is disconnected and can safely be destroyed.<br>&nbsp;&nbsp; stream.RESULT_OK_DISCONNECTING The stream is closing and may yet have outstanding resources.               StreamCallback stream.CALLBACK_EVENT_CONNECTION with stream.LINK_RESULT_DISCONNECTED is generated once fully disconnected.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; stream.RESULT_FAILED The stream failed to disconnect.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |

<a name="StreamDestroy"></a>

## StreamDestroy(id) ⇒ <code>int</code>
Destroy a stream and release all allocated resources.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; stream.RESULT_OK The stream is destroyed.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |

<a name="StreamStatus"></a>

## StreamStatus(id) ⇒ <code>int</code>
Fetch the current connection status of the stream.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; Valid connection status of stream, see stream.LINK_RESULT_*  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |

<a name="StreamSend"></a>

## StreamSend(id, length, data) ⇒ <code>int</code>
Send a data packet to a stream. When the packet has been fully accepted, a callback with stream.CALLBACK_EVENT_SEND_COMPLETE will be generated.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; stream.RESULT_OK The data packet was accepted and will be sent.<br>&nbsp;&nbsp; stream.RESULT_BUSY The stream is currently busy and can't currently process any more data.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; stream.RESULT_COULD_NOT_ALLOCATE Could not allocate data for the stream.<br>&nbsp;&nbsp; stream.RESULT_FAILED The stream is not in a state that can accept data.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |
| length | <code>int</code> | Data packet size. |
| data | <code>any</code> | Data packet to be written. |

<a name="StreamGetUrl"></a>

## StreamGetUrl(id) ⇒
Get stream local and remote URL.

**Kind**: global function  
**Returns**: Result - Object with result and URLs<br>&nbsp;&nbsp; stream.RESULT_OK The operation succeeded.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; stream.RESULT_FAILED The stream is not in a state where the URL can be retrieved.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |

<a name="StreamGetBtFrameSize"></a>

## StreamGetBtFrameSize(id) ⇒ <code>int</code>
Get BT frame size. Only applicable for the SPS stream.

**Kind**: global function  
**Returns**: <code>int</code> - Result - Frame size on success(> 0) or error when failing.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; stream.RESULT_FAILED The operation is not supported or in wrong state.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |

<a name="StreamAsynchRead"></a>

## StreamAsynchRead(id, outdataLength) ⇒ <code>int</code>
Do an asynchronous read. Only applicable for the I2C stream.The read data will be provided by stream.CALLBACK_EVENT_DATA_AVAILABLE in the callback.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; stream.RESULT_OK The operation succeeded.<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID Operation failed because invalid id was provided.<br>&nbsp;&nbsp; stream.RESULT_FAILED The operation is not supported or in wrong state.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id. |
| outdataLength | <code>int</code> | Number of bytes to read out. |

<a name="StreamGetUartId"></a>

## StreamGetUartId() ⇒ <code>int</code>
Returns the id of the UART stream created by default in non-deployed mode.Use to manipulate the default UART stream.

**Kind**: global function  
**Returns**: <code>int</code> - id or error code<br>&nbsp;&nbsp; 0 or higher: Valid id<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID: No UART stream created from outside script  
**Note**: Command will always return stream.RESULT_INVALID_ID in deployed mode  
<a name="StreamGetAtId"></a>

## StreamGetAtId() ⇒ <code>int</code>
Returns the id of the AT stream created by default in non-deployed mode.Use to manipulate the default AT stream.

**Kind**: global function  
**Returns**: <code>int</code> - id or error code<br>&nbsp;&nbsp; 0 or higher: Valid id<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID: No AT stream created from outside script  
**Note**: Command will always return stream.RESULT_INVALID_ID in deployed mode  
<a name="StreamGetDebugId"></a>

## StreamGetDebugId() ⇒ <code>int</code>
Returns the id of the debug stream created by default in non-deployed mode.Use to manipulate the default debug stream.

**Kind**: global function  
**Returns**: <code>int</code> - id or error code<br>&nbsp;&nbsp; 0 or higher: Valid id<br>&nbsp;&nbsp; stream.RESULT_INVALID_ID: No debug stream created from outside script  
**Note**: Command will always return stream.RESULT_INVALID_ID in deployed mode  
<a name="streamCallback"></a>

## streamCallback ⇒ <code>void</code>
Stream callback triggered on all stream related events.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Stream id |
| eventType | <code>int</code> | Type of callback event, see CALLBACK_EVENT_* above |
| param | <code>int</code> | Event specific integer parameter: <br>&nbsp;&nbsp; CALLBACK_EVENT_CONNECTION: <br>&nbsp;&nbsp; - Connection event id, see CONNECTION_EVT_* <br>&nbsp;&nbsp; CALLBACK_EVENT_DATA_AVAILABLE: <br>&nbsp;&nbsp; - Data length <br>&nbsp;&nbsp; CALLBACK_EVENT_SEND_COMPLETE: <br>&nbsp;&nbsp; - Not applicable |
| data | <code>int</code> | Event specific data parameter: <br>&nbsp;&nbsp; CALLBACK_EVENT_CONNECTION <br>&nbsp;&nbsp; - Not applicable <br>&nbsp;&nbsp; CALLBACK_EVENT_DATA_AVAILABLE <br>&nbsp;&nbsp; - Data <br>&nbsp;&nbsp; CALLBACK_EVENT_SEND_COMPLETE <br>&nbsp;&nbsp; - Not applicable |
| userdata | <code>any</code> | Userdata from the original call |

