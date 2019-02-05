## Functions

<dl>
<dt><a href="#BleGapDiscover">BleGapDiscover(type, mode, timeout)</a> ⇒ <code>int</code></dt>
<dd><p>Discover BLE devices. Need to use the central role.</p>
</dd>
<dt><a href="#BleGapDiscoverCallback">BleGapDiscoverCallback(remoteAddr, advType, rssi, data, dataLen, userdata)</a> ⇒ <code>void</code></dt>
<dd><p>Discover callback that is called for each device found.</p>
</dd>
<dt><a href="#BleGapSetDiscoverCallback">BleGapSetDiscoverCallback(callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Set discover callback.</p>
</dd>
<dt><a href="#BleGapDiscoverComplCallback">BleGapDiscoverComplCallback(userdata)</a> ⇒ <code>void</code></dt>
<dd><p>Discover callback that is called when finished.</p>
</dd>
<dt><a href="#BleGapSetAdvData">BleGapSetAdvData(data, length, type)</a> ⇒ <code>int</code></dt>
<dd><p>Set advertising data. Need to use the peripheral role.</p>
</dd>
<dt><a href="#BleGapGetLocalAddr">BleGapGetLocalAddr()</a> ⇒ <code>string</code></dt>
<dd><p>Returns local Bluetooth address as string.</p>
</dd>
</dl>

<a name="BleGapDiscover"></a>

## BleGapDiscover(type, mode, timeout) ⇒ <code>int</code>
Discover BLE devices. Need to use the central role.

**Kind**: global function  
**Returns**: <code>int</code> - Result  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>int</code> | Discovery type, see DISCOVERY_TYPE_* |
| mode | <code>int</code> | Active or passive scan mode see DISCOVERY_MODE_* |
| timeout | <code>int</code> | Stop discover devices after this timeout in ms |

<a name="BleGapDiscoverCallback"></a>

## BleGapDiscoverCallback(remoteAddr, advType, rssi, data, dataLen, userdata) ⇒ <code>void</code>
Discover callback that is called for each device found.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| remoteAddr | <code>string</code> | Remote address as a string |
| advType | <code>int</code> | Advertising type, see ADV_TYPE_* |
| rssi | <code>int</code> | Received signal strength |
| data | <code>any</code> | Advertising data |
| dataLen | <code>int</code> | Advertising data length |
| userdata | <code>any</code> | Userdata from the registration |

<a name="BleGapSetDiscoverCallback"></a>

## BleGapSetDiscoverCallback(callback, userdata) ⇒ <code>int</code>
Set discover callback.

**Kind**: global function  
**Returns**: <code>int</code> - Result  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>BleGapDiscoverCallback</code>](#BleGapDiscoverCallback) | Callback for received data. |
| userdata | <code>any</code> | Identifier when callback is triggered. Can be any type. |

<a name="BleGapDiscoverComplCallback"></a>

## BleGapDiscoverComplCallback(userdata) ⇒ <code>void</code>
Discover callback that is called when finished.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| userdata | <code>any</code> | Userdata from the registration |

<a name="BleGapSetAdvData"></a>

## BleGapSetAdvData(data, length, type) ⇒ <code>int</code>
Set advertising data. Need to use the peripheral role.

**Kind**: global function  
**Returns**: <code>int</code> - result  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>int</code> | Advertising data |
| length | <code>int</code> | Length of advertising data |
| type | <code>int</code> | Advertising type, see ADV_TYPE_* |

<a name="BleGapGetLocalAddr"></a>

## BleGapGetLocalAddr() ⇒ <code>string</code>
Returns local Bluetooth address as string.

**Kind**: global function  
**Returns**: <code>string</code> - Bluetooth address as string  
