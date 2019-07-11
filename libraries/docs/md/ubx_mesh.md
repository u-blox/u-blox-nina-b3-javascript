## Functions

<dl>
<dt><a href="#SystemMeshStart">SystemMeshStart()</a> ⇒ <code>int</code></dt>
<dd><p>Starts the Mesh functionality</p>
</dd>
<dt><a href="#MeshSetDataEventCallback">MeshSetDataEventCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set Mesh data event callback.</p>
</dd>
<dt><a href="#MeshSetReliableEventCallback">MeshSetReliableEventCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set reliable event callback.</p>
</dd>
<dt><a href="#MeshPublish">MeshPublish(elementIndex, modelIndex, opCode, data, dataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Publish to the publish address.</p>
</dd>
<dt><a href="#MeshReliablePublish">MeshReliablePublish(elementIndex, modelIndex, opCode, replyOpCode, timeoutTime, reliableID, data, dataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Reliable publish (SET) to the publish address.</p>
</dd>
<dt><a href="#MeshReply">MeshReply(eventHandle, elementIndex, modelIndex, opCode, data, dataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Reply to a message, e.g. a reply to a reliable SET or GET.</p>
</dd>
<dt><a href="#MeshStatusReply">MeshStatusReply(eventHandle)</a> ⇒ <code>int</code></dt>
<dd><p>Reply to a STATUS message. Indicate that the message is received.</p>
</dd>
<dt><a href="#MeshVersionRead">MeshVersionRead()</a> ⇒ <code>int</code></dt>
<dd><p>Read the version number previously written by MeshVersionWrite.</p>
</dd>
<dt><a href="#MeshVersionWrite">MeshVersionWrite(versionNumber)</a> ⇒ <code>int</code></dt>
<dd><p>Write the version number.</p>
</dd>
<dt><a href="#MeshNodeConfigRead">MeshNodeConfigRead()</a> ⇒ <code>int</code></dt>
<dd><p>Read the current node config status.</p>
</dd>
<dt><a href="#MeshModelCreate">MeshModelCreate(modelIndex, type, companyId, modelId)</a> ⇒ <code>int</code></dt>
<dd><p>Create a model and assign a model index to it. The first model created shall use index #0.</p>
</dd>
<dt><a href="#MeshModelGenericCreate">MeshModelGenericCreate(modelIndex, modelId)</a> ⇒ <code>int</code></dt>
<dd><p>Use a SIG generic model and assign it to a model index. The first model created shall use index #0.</p>
</dd>
<dt><a href="#MeshModelAddOpcode">MeshModelAddOpcode(modelIndex, opcode)</a> ⇒ <code>int</code></dt>
<dd><p>Add an opcode to a user defined model.</p>
</dd>
<dt><a href="#MeshElementAdd">MeshElementAdd(elementIndex, modelIndex)</a> ⇒ <code>int</code></dt>
<dd><p>Add an element, referencing a model, to the node. The first element shall use elementIndex #0.</p>
</dd>
<dt><a href="#MeshDeviceInfoWrite">MeshDeviceInfoWrite(companyId, productId, versionId)</a> ⇒ <code>int</code></dt>
<dd><p>Define the composition data which identifies the node.</p>
</dd>
<dt><a href="#MeshDeviceInfoRead">MeshDeviceInfoRead()</a> ⇒ <code><a href="#meshNodeData">meshNodeData</a></code></dt>
<dd><p>Read the composition data which identifies the node.</p>
</dd>
<dt><a href="#MeshLocalAddressRead">MeshLocalAddressRead()</a> ⇒ <code>object</code></dt>
<dd><p>Read the local address of the node and the number of elements.</p>
</dd>
<dt><a href="#MeshSetBeaconUIDEventCallback">MeshSetBeaconUIDEventCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set Eddystone Beacon UID data event callback.</p>
</dd>
<dt><a href="#MeshSetBeaconURLEventCallback">MeshSetBeaconURLEventCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set Eddystone Beacon URL event callback.</p>
</dd>
<dt><a href="#MeshSetIBeaconEventCallback">MeshSetIBeaconEventCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set iBeacon event callback.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#meshNodeData">meshNodeData</a> : <code>Object</code></dt>
<dd><p>Object holding node composition data</p>
</dd>
<dt><a href="#meshDataEventObject">meshDataEventObject</a> : <code>Object</code></dt>
<dd><p>Object containing the data received by the MeshDataEventCallback.</p>
</dd>
<dt><a href="#meshBeaconUIDEventObject">meshBeaconUIDEventObject</a> : <code>Object</code></dt>
<dd><p>Object containing the data received by the MeshBeaconUIDEventCallback.</p>
</dd>
<dt><a href="#meshBeaconURLEventObject">meshBeaconURLEventObject</a> : <code>Object</code></dt>
<dd><p>Object containing the data received by the MeshBeaconURLEventCallback.</p>
</dd>
<dt><a href="#meshIBeaconEventObject">meshIBeaconEventObject</a> : <code>Object</code></dt>
<dd><p>Object containing the data received by the MeshIBeaconEventCallback.</p>
</dd>
<dt><a href="#meshDataEventCallback">meshDataEventCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object for request to GET a value, a response to an acknowledged SET or a reception of a Status message. Always reply.</p>
</dd>
<dt><a href="#meshReliableEventCallback">meshReliableEventCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object that is status report to a reliable PUT. Only received when a reliable PUT failed.</p>
</dd>
<dt><a href="#meshBeaconUIDEventCallback">meshBeaconUIDEventCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object for a Eddystone UID beacon.</p>
</dd>
<dt><a href="#meshBeaconURLEventCallback">meshBeaconURLEventCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object for a Eddystone URL beacon.</p>
</dd>
<dt><a href="#meshIBeaconEventCallback">meshIBeaconEventCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object for a iBeacon beacon</p>
</dd>
</dl>

<a name="SystemMeshStart"></a>

## SystemMeshStart() ⇒ <code>int</code>
Starts the Mesh functionality

**Kind**: global function  
**Returns**: <code>int</code> - result  
<a name="MeshSetDataEventCallback"></a>

## MeshSetDataEventCallback(callback, userdata) ⇒ <code>int</code>
Set Mesh data event callback.

**Kind**: global function  
**Returns**: <code>int</code> - Error Code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>meshDataEventCallback</code>](#meshDataEventCallback) | Function called when mesh data arrives |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="MeshSetReliableEventCallback"></a>

## MeshSetReliableEventCallback(callback, userdata) ⇒ <code>int</code>
Set reliable event callback.

**Kind**: global function  
**Returns**: <code>int</code> - Error Code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>meshDataEventCallback</code>](#meshDataEventCallback) | Function called when a reliable publish fails |
| userdata | <code>userdata</code> | Data from the original call.{string} userdata |

<a name="MeshPublish"></a>

## MeshPublish(elementIndex, modelIndex, opCode, data, dataLength) ⇒ <code>int</code>
Publish to the publish address.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| elementIndex | <code>int</code> | Index of the element publishing the message. |
| modelIndex | <code>int</code> | Index of the model  publishing the message. |
| opCode | <code>int</code> | opCode identifying the message. |
| data | <code>string</code> | Actual message sent. Empty string if opCode with no data. |
| dataLength | <code>int</code> | Length of the data. 0 if opCode with no data. |

<a name="MeshReliablePublish"></a>

## MeshReliablePublish(elementIndex, modelIndex, opCode, replyOpCode, timeoutTime, reliableID, data, dataLength) ⇒ <code>int</code>
Reliable publish (SET) to the publish address.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| elementIndex | <code>int</code> | Index of the element publishing the message. |
| modelIndex | <code>int</code> | Index of the model publishing the message. |
| opCode | <code>int</code> | opCode identifying the message. |
| replyOpCode | <code>int</code> | Expected opCode as successful response to the reliable publish. |
| timeoutTime | <code>int</code> | How long to wait for the response (seconds) |
| reliableID | <code>int</code> | Identifies the reliable publish (PUT) in meshDataEventCallback if failure.<br>0xFFFF reserved for internal use. |
| data | <code>string</code> | Actual message sent. Empty string if opCode with no data. |
| dataLength | <code>int</code> | Length of the data. 0 if opCode with no data. |

<a name="MeshReply"></a>

## MeshReply(eventHandle, elementIndex, modelIndex, opCode, data, dataLength) ⇒ <code>int</code>
Reply to a message, e.g. a reply to a reliable SET or GET.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| eventHandle | <code>int</code> | Identifies the message to reply to. |
| elementIndex | <code>int</code> | Index of the element replying. |
| modelIndex | <code>int</code> | Index of the model replying. |
| opCode | <code>int</code> | opCode identifying the message. |
| data | <code>string</code> | Reply message. |
| dataLength | <code>int</code> | Length of the data. |

<a name="MeshStatusReply"></a>

## MeshStatusReply(eventHandle) ⇒ <code>int</code>
Reply to a STATUS message. Indicate that the message is received.

**Kind**: global function  
**Returns**: <code>int</code> - Error code. <br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| eventHandle | <code>int</code> | Identifies the message to reply to. |

<a name="MeshVersionRead"></a>

## MeshVersionRead() ⇒ <code>int</code>
Read the version number previously written by MeshVersionWrite.

**Kind**: global function  
**Returns**: <code>int</code> - Current version number (>0) or error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  
<a name="MeshVersionWrite"></a>

## MeshVersionWrite(versionNumber) ⇒ <code>int</code>
Write the version number.

**Kind**: global function  
**Returns**: <code>int</code> - Error code<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| versionNumber | <code>int</code> | Version number |

<a name="MeshNodeConfigRead"></a>

## MeshNodeConfigRead() ⇒ <code>int</code>
Read the current node config status.

**Kind**: global function  
**Returns**: <code>int</code> - <br>&nbsp;&nbsp;mesh.STATE_EMPTY<br>&nbsp;&nbsp;mesh.STATE_MODELS_ELEMENTS_STEP_1<br>&nbsp;&nbsp;mesh.STATE_MODELS_ELEMENTS_FINISHED<br>&nbsp;&nbsp;mesh.STATE_PROVISIONED<br>&nbsp;&nbsp;mesh.STATE_CONFIGURED  
<a name="MeshModelCreate"></a>

## MeshModelCreate(modelIndex, type, companyId, modelId) ⇒ <code>int</code>
Create a model and assign a model index to it. The first model created shall use index #0.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| modelIndex | <code>int</code> | 0... |
| type | <code>int</code> | 0: Server, 1: Client |
| companyId | <code>int</code> | 16-bit identifier, e.g. "\x00\x59" ==> 0x0059 Nordic Semi |
| modelId | <code>int</code> | 16-bit identifier |

<a name="MeshModelGenericCreate"></a>

## MeshModelGenericCreate(modelIndex, modelId) ⇒ <code>int</code>
Use a SIG generic model and assign it to a model index. The first model created shall use index #0.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| modelIndex | <code>int</code> | 0... |
| modelId | <code>int</code> | 16-bit identifier for SIG model, e.g. "\x10\x01" ==> 0x1001 Generic ON/OFF client |

<a name="MeshModelAddOpcode"></a>

## MeshModelAddOpcode(modelIndex, opcode) ⇒ <code>int</code>
Add an opcode to a user defined model.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| modelIndex | <code>int</code> | 0... (must reference an existing model) |
| opcode | <code>int</code> | 16-bit identifier for an opcode, e.g. "\x00\xD7" ==> 0x00D7 |

<a name="MeshElementAdd"></a>

## MeshElementAdd(elementIndex, modelIndex) ⇒ <code>int</code>
Add an element, referencing a model, to the node. The first element shall use elementIndex #0.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| elementIndex | <code>int</code> | 0... |
| modelIndex | <code>int</code> | 0... (must reference to an existing model) |

<a name="MeshDeviceInfoWrite"></a>

## MeshDeviceInfoWrite(companyId, productId, versionId) ⇒ <code>int</code>
Define the composition data which identifies the node.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| companyId | <code>int</code> | 16-bit identifier assigned by Bluetooth SIG, e.g. "\x00\x59" ==> 0x0059 Nordic Semi |
| productId | <code>int</code> | 16-bit identifier, user specified e.g. "\x00\x01" ==> 0x0001 |
| versionId | <code>int</code> | 16-bit identifier, user specified e.g. "\x00\x01" ==> 0x0001 |

<a name="MeshDeviceInfoRead"></a>

## MeshDeviceInfoRead() ⇒ [<code>meshNodeData</code>](#meshNodeData)
Read the composition data which identifies the node.

**Kind**: global function  
<a name="MeshLocalAddressRead"></a>

## MeshLocalAddressRead() ⇒ <code>object</code>
Read the local address of the node and the number of elements.

**Kind**: global function  
**Returns**: <code>object</code> - With labelled hexadecimal strings localAddr and numberLocalAddr.  
<a name="MeshSetBeaconUIDEventCallback"></a>

## MeshSetBeaconUIDEventCallback(callback, userdata) ⇒ <code>int</code>
Set Eddystone Beacon UID data event callback.

**Kind**: global function  
**Returns**: <code>int</code> - Error Code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>meshBeaconUIDEventCallback</code>](#meshBeaconUIDEventCallback) | Function called when beacon data arrives. |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="MeshSetBeaconURLEventCallback"></a>

## MeshSetBeaconURLEventCallback(callback, userdata) ⇒ <code>int</code>
Set Eddystone Beacon URL event callback.

**Kind**: global function  
**Returns**: <code>int</code> - Error Code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>meshBeaconURLEventCallback</code>](#meshBeaconURLEventCallback) | Function called when beacon data arrives. |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="MeshSetIBeaconEventCallback"></a>

## MeshSetIBeaconEventCallback(callback, userdata) ⇒ <code>int</code>
Set iBeacon event callback.

**Kind**: global function  
**Returns**: <code>int</code> - Error Code.<br>&nbsp;&nbsp;mesh.RESULT_OK<br>&nbsp;&nbsp;mesh.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>meshIBeaconEventCallback</code>](#meshIBeaconEventCallback) | Function called when beacon data arrives. |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="meshNodeData"></a>

## meshNodeData : <code>Object</code>
Object holding node composition data

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| companyID | <code>string</code> | 
| productId | <code>string</code> | 
| versionId | <code>string</code> | 

<a name="meshDataEventObject"></a>

## meshDataEventObject : <code>Object</code>
Object containing the data received by the MeshDataEventCallback.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| eventHdl | <code>int</code> | Handle. |
| element | <code>int</code> |  |
| model | <code>int</code> |  |
| opCode | <code>int</code> | opCode identifying the message. |
| srcAddrType | <code>int</code> |  |
| srcAdr | <code>int</code> |  |
| dstAddrType | <code>int</code> |  |
| dstAdr | <code>int</code> |  |
| ttl | <code>int</code> |  |
| rssi | <code>int</code> |  |
| dataLength | <code>int</code> |  |
| pEventData | <code>void</code> | Pointer to the data received. |

<a name="meshBeaconUIDEventObject"></a>

## meshBeaconUIDEventObject : <code>Object</code>
Object containing the data received by the MeshBeaconUIDEventCallback.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| txPower | <code>int</code> |  |
| rssi | <code>int</code> |  |
| pBIDNID | <code>void</code> | Pointer to BID/NID. |

<a name="meshBeaconURLEventObject"></a>

## meshBeaconURLEventObject : <code>Object</code>
Object containing the data received by the MeshBeaconURLEventCallback.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| txPower | <code>int</code> |  |
| RSSI | <code>int</code> |  |
| urlScheme | <code>int</code> |  |
| urlLength | <code>int</code> |  |
| pURL | <code>void</code> | Pointer to the URL. |

<a name="meshIBeaconEventObject"></a>

## meshIBeaconEventObject : <code>Object</code>
Object containing the data received by the MeshIBeaconEventCallback.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| txPower | <code>int</code> |  |
| major | <code>int</code> |  |
| minor | <code>int</code> |  |
| pUUID | <code>void</code> | Pointer to the beacon UUID. |

<a name="meshDataEventCallback"></a>

## meshDataEventCallback ⇒ <code>void</code>
Callback object for request to GET a value, a response to an acknowledged SET or a reception of a Status message. Always reply.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| dataStruct | <code>void</code> | Data structure returning the event data. Use s2o(dataStruct, meshEventStructToObject) to convert object of type [meshDataEventObject](#meshDataEventObject). |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="meshReliableEventCallback"></a>

## meshReliableEventCallback ⇒ <code>void</code>
Callback object that is status report to a reliable PUT. Only received when a reliable PUT failed.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| reliableID | <code>int</code> | Identifies the reliable PUT. reliableID was set when the reliable put was issued. |
| status | <code>int</code> | Identifies why the reliable PUT failed. <br>&nbsp;&nbsp;mesh.RELIABE_TIMEOUT <br>&nbsp;&nbsp;mesh.RELIABLE_CANCELLED |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="meshBeaconUIDEventCallback"></a>

## meshBeaconUIDEventCallback ⇒ <code>void</code>
Callback object for a Eddystone UID beacon.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| dataStruct | <code>void</code> | Data structure returning the beacon data. Use s2o(dataStruct, beaconUIDEventStructToObject) to convert object of type [meshBeaconUIDEventObject](#meshBeaconUIDEventObject). |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="meshBeaconURLEventCallback"></a>

## meshBeaconURLEventCallback ⇒ <code>void</code>
Callback object for a Eddystone URL beacon.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| dataStruct | <code>void</code> | Data structure returning the beacon data. Use s2o(dataStruct, beaconURLEventStructToObject) to convert object of type [meshBeaconURLEventObject](#meshBeaconURLEventObject). |
| userdata | <code>userdata</code> | Data from the original call. |

<a name="meshIBeaconEventCallback"></a>

## meshIBeaconEventCallback ⇒ <code>void</code>
Callback object for a iBeacon beacon

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| dataStruct | <code>void</code> | Data structure returning the beacon data. Use s2o(dataStruct, iBeaconEventStructToObject) to convert object of type [meshIBeaconEventObject](#meshIBeaconEventObject). |
| userdata | <code>userdata</code> | Data from the original call. |

