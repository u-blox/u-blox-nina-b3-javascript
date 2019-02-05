## Functions

<dl>
<dt><a href="#GattsSetEventCallback">GattsSetEventCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set GATT event callback.</p>
</dd>
<dt><a href="#GattsServiceCreate">GattsServiceCreate(uuidType, uuid)</a> ⇒ <code>int</code></dt>
<dd><p>Create a new GATT service.</p>
</dd>
<dt><a href="#GattsCharacteristicCreate">GattsCharacteristicCreate(serviceHandle, uuidType, uuid, properties, security, initialValue, initialValueLength)</a> ⇒ <code>int</code> | <code>int</code> | <code>int</code></dt>
<dd><p>Create a new GATT characteristic.</p>
</dd>
<dt><a href="#GattsDescriptorCreate">GattsDescriptorCreate(charHandle, uuidType, uuid, security, initialValue, initialValueLength)</a> ⇒ <code>int</code></dt>
<dd><p>Create a new GATT descriptor.</p>
</dd>
<dt><a href="#GattsSend">GattsSend(type, connectionHandle, attributeHandle, data, dataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Send data to a remote client.</p>
</dd>
<dt><a href="#GattsWrite">GattsWrite(attrHandle, data, dataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Write a new value to an attribute without updating remote clients.</p>
</dd>
<dt><a href="#GattsReadResp">GattsReadResp(connectionHandle, data, dataLength)</a> ⇒ <code>int</code></dt>
<dd><p>Respond to an unsolicited read request event.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#gattsEventCallback">gattsEventCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object for GATT server events.</p>
</dd>
</dl>

<a name="GattsSetEventCallback"></a>

## GattsSetEventCallback(callback, userdata) ⇒ <code>int</code>
Set GATT event callback.

**Kind**: global function  
**Returns**: <code>int</code> - Error Code.<br>&nbsp;&nbsp; gatts.RESULT_OK<br>&nbsp;&nbsp; gatts.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>gattsEventCallback</code>](#gattsEventCallback) | Function that will be called on all events. |
| userdata | <code>string</code> | Identifier when callback is triggered. Can be any type. |

<a name="GattsServiceCreate"></a>

## GattsServiceCreate(uuidType, uuid) ⇒ <code>int</code>
Create a new GATT service.

**Kind**: global function  
**Returns**: <code>int</code> - non-zero service handle value or error code.<br>&nbsp;&nbsp; gatts.RESULT_ERROR<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_UUID  

| Param | Type | Description |
| --- | --- | --- |
| uuidType | <code>int</code> | Type of characteristic UUID. <br>&nbsp;&nbsp; gatts.UUID_TYPE_16 <br>&nbsp;&nbsp; gatts.UUID_TYPE_128 |
| uuid | <code>string</code> | UUID of service with hexadecimal characters. |

<a name="GattsCharacteristicCreate"></a>

## GattsCharacteristicCreate(serviceHandle, uuidType, uuid, properties, security, initialValue, initialValueLength) ⇒ <code>int</code> \| <code>int</code> \| <code>int</code>
Create a new GATT characteristic.

**Kind**: global function  
**Returns**: <code>int</code> - Non-zero characteristic value handle or error code.<br>&nbsp;&nbsp; gatts.RESULT_ERROR<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_UUID<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_PROPERTIES<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_SECURITY_PARAM<br><code>int</code> - Non-zero characteristic value handle.<br><code>int</code> - Non-zero client characteristic configuration descriptor handle.  

| Param | Type | Description |
| --- | --- | --- |
| serviceHandle | <code>int</code> | Handle value of the parent service. |
| uuidType | <code>int</code> | Type of characteristic UUID. <br>&nbsp;&nbsp; gatts.UUID_TYPE_16 <br>&nbsp;&nbsp; gatts.UUID_TYPE_128 |
| uuid | <code>string</code> | UUID of characteristic with hexadecimal characters. |
| properties | <code>int</code> | Properties of characteristic. More than one property can be combined. <br>&nbsp;&nbsp; gatts.PROPERTY_BROADCAST <br>&nbsp;&nbsp; gatts.PROPERTY_READ <br>&nbsp;&nbsp; gatts.PROPERTY_WRITE_NO_RESP <br>&nbsp;&nbsp; gatts.PROPERTY_WRITE <br>&nbsp;&nbsp; gatts.PROPERTY_NOTIFY <br>&nbsp;&nbsp; gatts.PROPERTY_INDICATE <br>&nbsp;&nbsp; gatts.PROPERTY_WRITE_SIGNED |
| security | <code>int</code> | Link layer security requirement of characteristic. Read security and write security should be combined. <br>&nbsp;&nbsp; gatts.SECURITY_READ_NONE <br>&nbsp;&nbsp; gatts.SECURITY_READ_NON_AUTH <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NONE <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NON_AUTH |
| initialValue | <code>string</code> | Initial value of the characteristic. <br>If an empty string is provided, an explicit read authorization request event will be generated for every read by clients. |
| initialValueLength | <code>int</code> | Number of bytes of initial value. |

<a name="GattsDescriptorCreate"></a>

## GattsDescriptorCreate(charHandle, uuidType, uuid, security, initialValue, initialValueLength) ⇒ <code>int</code>
Create a new GATT descriptor.

**Kind**: global function  
**Returns**: <code>int</code> - Non-zero descriptor handle or error code.<br>&nbsp;&nbsp; gatts.RESULT_ERROR<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_UUID<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_SECURITY_PARAM  

| Param | Type | Description |
| --- | --- | --- |
| charHandle | <code>int</code> | Handle value of the characteristic. |
| uuidType | <code>int</code> | Type of descriptor UUID. <br>&nbsp;&nbsp; gatts.UUID_TYPE_16 <br>&nbsp;&nbsp; gatts.UUID_TYPE_128 |
| uuid | <code>string</code> | UUID of descriptor with hexadecimal characters. |
| security | <code>int</code> | Link layer security requirement of characteristic. Read security and write security should be combined. <br>&nbsp;&nbsp; gatts.SECURITY_READ_NONE <br>&nbsp;&nbsp; gatts.SECURITY_READ_NON_AUTH <br>&nbsp;&nbsp; gatts.SECURITY_READ_AUTH <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NONE <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_NON_AUTH <br>&nbsp;&nbsp; gatts.SECURITY_WRITE_AUTH |
| initialValue | <code>string</code> | Initial value of the descriptor. |
| initialValueLength | <code>int</code> | Number of bytes of initial value. |

<a name="GattsSend"></a>

## GattsSend(type, connectionHandle, attributeHandle, data, dataLength) ⇒ <code>int</code>
Send data to a remote client.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp; gatts.RESULT_OK<br>&nbsp;&nbsp; gatts.RESULT_ERROR<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>int</code> | Type of packet to send. <br>&nbsp;&nbsp; gatts.SEND_INDICATION <br>&nbsp;&nbsp; gatts.SEND_NOTIFICATION |
| connectionHandle | <code>string</code> | Handle of the GAP connection. |
| attributeHandle | <code>int</code> | Handle of the attribute that sends the data. |
| data | <code>string</code> | Input data in hex format. |
| dataLength | <code>int</code> | Number of bytes of data. |

<a name="GattsWrite"></a>

## GattsWrite(attrHandle, data, dataLength) ⇒ <code>int</code>
Write a new value to an attribute without updating remote clients.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp; gatts.RESULT_OK<br>&nbsp;&nbsp; gatts.RESULT_ERROR<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE  

| Param | Type | Description |
| --- | --- | --- |
| attrHandle | <code>int</code> | Handle value of the attribute. |
| data | <code>string</code> | Updated data in hex format. |
| dataLength | <code>int</code> | Number of bytes of data. |

<a name="GattsReadResp"></a>

## GattsReadResp(connectionHandle, data, dataLength) ⇒ <code>int</code>
Respond to an unsolicited read request event.

**Kind**: global function  
**Returns**: <code>int</code> - Error code.<br>&nbsp;&nbsp; gatts.RESULT_OK<br>&nbsp;&nbsp; gatts.RESULT_ERROR<br>&nbsp;&nbsp; gatts.RESULT_ERROR_INVALID_DATA_VALUE  

| Param | Type | Description |
| --- | --- | --- |
| connectionHandle | <code>int</code> | Handle of the GAP connection. |
| data | <code>string</code> | Data to be updated. |
| dataLength | <code>int</code> | Number of bytes of data. |

<a name="gattsEventCallback"></a>

## gattsEventCallback ⇒ <code>void</code>
Callback object for GATT server events.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>int</code> | <br>&nbsp;&nbsp; gatts.EVENT_CONNECTED <br>&nbsp;&nbsp; gatts.EVENT_DISCONNECTED <br>&nbsp;&nbsp; gatts.EVENT_INDICATION_RESPONSE <br>&nbsp;&nbsp; gatts.EVENT_DATA <br>&nbsp;&nbsp; gatts.EVENT_READ_REQUSET |
| connectionHandle | <code>int</code> | GAP connection that triggered the callback. |
| attributeHandle | <code>int</code> | GATT attribute. |
| dataLength | <code>int</code> | Length of data written by the client. |
| clientData | <code>string</code> | Actual data written by the client. |
| Userdata | <code>any</code> | Data from the original call. |

