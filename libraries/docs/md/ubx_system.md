## Functions

<dl>
<dt><a href="#SystemBleStart">SystemBleStart()</a> ⇒ <code>int</code></dt>
<dd><p>Starts the BLE stack.
Use AT command to configure prior to this call,
once started no reconfigure is possible.</p>
</dd>
<dt><a href="#SystemGetAvailHeap">SystemGetAvailHeap()</a> ⇒ <code>int</code></dt>
<dd><p>Returns available heap that can be useful during development.
The heap area consists of a pool with different sizes.</p>
</dd>
<dt><a href="#SystemSetSysTickMode">SystemSetSysTickMode(mode)</a> ⇒ <code>int</code></dt>
<dd><p>Set sys tick mode
LOW decreases power consumption but will have undefined behavior on
the UART so should only be used when UART is off.</p>
</dd>
<dt><a href="#SystemDeepSleep">SystemDeepSleep(pin)</a> ⇒ <code>int</code></dt>
<dd><p>Go to deep sleep.<br>
Put module in deep sleep, this is the lowest power mode.</p>
</dd>
<dt><a href="#SystemGetRetentionValue">SystemGetRetentionValue(index)</a> ⇒ <code>int</code></dt>
<dd><p>Retrieve a stored value.</p>
</dd>
<dt><a href="#SystemSetRetentionValue">SystemSetRetentionValue(index, value)</a> ⇒ <code>int</code></dt>
<dd><p>Store a value.<br>
Values set with this commands survives a deep sleep cycle.</p>
</dd>
</dl>

<a name="SystemBleStart"></a>

## SystemBleStart() ⇒ <code>int</code>
Starts the BLE stack.Use AT command to configure prior to this call,once started no reconfigure is possible.

**Kind**: global function  
**Returns**: <code>int</code> - Result  
<a name="SystemGetAvailHeap"></a>

## SystemGetAvailHeap() ⇒ <code>int</code>
Returns available heap that can be useful during development.The heap area consists of a pool with different sizes.

**Kind**: global function  
**Returns**: <code>int</code> - Available total heap size for all sizes combined  
<a name="SystemSetSysTickMode"></a>

## SystemSetSysTickMode(mode) ⇒ <code>int</code>
Set sys tick modeLOW decreases power consumption but will have undefined behavior onthe UART so should only be used when UART is off.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; system.RESULT_OK<br>&nbsp;&nbsp; system.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>int</code> | <br>&nbsp;&nbsp; SYSTEM_SYS_TICK_MODE_HIGH <br>&nbsp;&nbsp; SYSTEM_SYS_TICK_MODE_LOW |

<a name="SystemDeepSleep"></a>

## SystemDeepSleep(pin) ⇒ <code>int</code>
Go to deep sleep.<br>Put module in deep sleep, this is the lowest power mode.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; system.RESULT_OK<br>&nbsp;&nbsp; system.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Wakeup pin, a trigger on this pin will wake the module (Note: Use SYSTEM_DEFAULT_DSR_PIN for DSR) |

<a name="SystemGetRetentionValue"></a>

## SystemGetRetentionValue(index) ⇒ <code>int</code>
Retrieve a stored value.

**Kind**: global function  
**Returns**: <code>int</code> - Value<br>&nbsp;&nbsp; system.RESULT_OUT_OF_RANGE Invalid range  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> | Index of the value, valid numbers are 0..19. |

<a name="SystemSetRetentionValue"></a>

## SystemSetRetentionValue(index, value) ⇒ <code>int</code>
Store a value.<br>Values set with this commands survives a deep sleep cycle.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; system.RESULT_OK<br>&nbsp;&nbsp; system.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> | Index of the value, valid numbers are 0..19. |
| value | <code>int</code> | Value to be stored. |

