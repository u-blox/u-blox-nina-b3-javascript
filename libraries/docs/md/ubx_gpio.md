## Functions

<dl>
<dt><a href="#GpioOpen">GpioOpen(pin, mode, value)</a> ⇒ <code>int</code></dt>
<dd><p>Open a GPIO pin.</p>
</dd>
<dt><a href="#GpioCallback">GpioCallback(pin, edge, mode, callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Open a GPIO pin with a callback.</p>
</dd>
<dt><a href="#GpioDelete">GpioDelete(pin)</a> ⇒ <code>int</code></dt>
<dd><p>Delete a GPIO object.</p>
</dd>
<dt><a href="#GpioSet">GpioSet(pin, value)</a> ⇒ <code>int</code></dt>
<dd><p>Set pin state on an open output pin.</p>
</dd>
<dt><a href="#GpioGet">GpioGet(pin)</a> ⇒ <code>int</code></dt>
<dd><p>Get the value of an open pin.</p>
</dd>
<dt><a href="#GpioIsOpen">GpioIsOpen(pin)</a> ⇒ <code>int</code></dt>
<dd><p>Check if a pin is open.</p>
</dd>
<dt><a href="#GpioIsValid">GpioIsValid(pin)</a> ⇒ <code>int</code></dt>
<dd><p>Check if a pin is valid.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#triggerCallback">triggerCallback</a> ⇒ <code>any</code></dt>
<dd><p>Callback object.</p>
</dd>
</dl>

<a name="GpioOpen"></a>

## GpioOpen(pin, mode, value) ⇒ <code>int</code>
Open a GPIO pin.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gpio.RESULT_OK<br>&nbsp;&nbsp; gpio.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |
| mode | <code>int</code> | Pin mode. |
| value | <code>int</code> | Initial value for output pin. |

<a name="GpioCallback"></a>

## GpioCallback(pin, edge, mode, callback, userdata) ⇒ <code>int</code>
Open a GPIO pin with a callback.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gpio.RESULT_OK<br>&nbsp;&nbsp; gpio.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |
| edge | <code>int</code> | Trigger edge. |
| mode | <code>int</code> | Pin mode. |
| callback | [<code>triggerCallback</code>](#triggerCallback) | Callback. |
| userdata | <code>any</code> | Identifier when callback is triggered. Can be any type. |

<a name="GpioDelete"></a>

## GpioDelete(pin) ⇒ <code>int</code>
Delete a GPIO object.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gpio.RESULT_OK<br>&nbsp;&nbsp; gpio.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |

<a name="GpioSet"></a>

## GpioSet(pin, value) ⇒ <code>int</code>
Set pin state on an open output pin.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gpio.RESULT_OK<br>&nbsp;&nbsp; gpio.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |
| value | <code>int</code> | Valid: <br>&nbsp;&nbsp; gpio.VALUE_LOW <br>&nbsp;&nbsp; gpio.VALUE_HIGH |

<a name="GpioGet"></a>

## GpioGet(pin) ⇒ <code>int</code>
Get the value of an open pin.

**Kind**: global function  
**Returns**: <code>int</code> - Value<br>&nbsp;&nbsp; gpio.VALUE_INVALID<br>&nbsp;&nbsp; gpio.VALUE_LOW<br>&nbsp;&nbsp; gpio.VALUE_HIGH  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |

<a name="GpioIsOpen"></a>

## GpioIsOpen(pin) ⇒ <code>int</code>
Check if a pin is open.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gpio.RESULT_OK<br>&nbsp;&nbsp; gpio.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |

<a name="GpioIsValid"></a>

## GpioIsValid(pin) ⇒ <code>int</code>
Check if a pin is valid.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gpio.RESULT_OK<br>&nbsp;&nbsp; gpio.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Module pin number. |

<a name="triggerCallback"></a>

## triggerCallback ⇒ <code>any</code>
Callback object.

**Kind**: global typedef  
**Returns**: <code>any</code> - Result  

| Param | Type | Description |
| --- | --- | --- |
| pin | <code>int</code> | Pin that triggered the callback |
| value | <code>int</code> | New value of the pin |
| userdata | <code>any</code> | Userdata from the original call |

