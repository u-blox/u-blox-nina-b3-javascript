## Functions

<dl>
<dt><a href="#BleSecSetPairingMode">BleSecSetPairingMode(pairingMode)</a> ⇒ <code>int</code></dt>
<dd><p>Enable/Disable Pairing for the device.</p>
</dd>
<dt><a href="#BleSecEraseAllPeersRequest">BleSecEraseAllPeersRequest(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Request to erase all link layer keys and peer information.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ErasePeersCallback">ErasePeersCallback</a> ⇒ <code>void</code></dt>
<dd><p>Connection callback that is called after erasing all link layer peer information.</p>
</dd>
</dl>

<a name="BleSecSetPairingMode"></a>

## BleSecSetPairingMode(pairingMode) ⇒ <code>int</code>
Enable/Disable Pairing for the device.

**Kind**: global function  
**Returns**: <code>int</code> - Error code<br>&nbsp;&nbsp; bleSec.RESULT_OK<br>&nbsp;&nbsp; bleSec.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pairingMode | <code>int</code> | BLE Link layer security mode <br>&nbsp;&nbsp; bleSec.PAIRING_MODE_DISABLED <br>&nbsp;&nbsp; bleSec.PAIRING_MODE_ENABLED |

<a name="BleSecEraseAllPeersRequest"></a>

## BleSecEraseAllPeersRequest(callback, userdata) ⇒ <code>int</code>
Request to erase all link layer keys and peer information.

**Kind**: global function  
**Returns**: <code>int</code> - Error code<br>&nbsp;&nbsp; bleSec.RESULT_OK<br>&nbsp;&nbsp; bleSec.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>ErasePeersCallback</code>](#ErasePeersCallback) | Callback function |
| userdata | <code>string</code> | Identifier when callback is triggered. Can be any type. |

<a name="ErasePeersCallback"></a>

## ErasePeersCallback ⇒ <code>void</code>
Connection callback that is called after erasing all link layer peer information.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| result | <code>int</code> | Status of the erase request |
| userdata | <code>userdata</code> | Data from the original call. <br>&nbsp;&nbsp; bleSec.RESULT_OK <br>&nbsp;&nbsp; bleSec.RESULT_ERROR |

