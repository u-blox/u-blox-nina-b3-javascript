## Functions

<dl>
<dt><a href="#TimerStart">TimerStart(timeout, callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Start a new one-shot timer.<br>
Once callback is triggered, id is no longer valid.</p>
</dd>
<dt><a href="#TimerStartReoccurring">TimerStartReoccurring(timeout, callback, userdata)</a> ⇒ <code>int</code></dt>
<dd><p>Start a new re-occurring timer.<br>
Will trigger forever or until stopped.</p>
</dd>
<dt><a href="#TimerStop">TimerStop(id)</a> ⇒ <code>void</code></dt>
<dd><p>Stops a running timer.<br>
Works for both one-shot and re-occurring timers.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TimerCallback">TimerCallback</a> ⇒ <code>void</code></dt>
<dd><p>Callback object for elapsed timer.</p>
</dd>
</dl>

<a name="TimerStart"></a>

## TimerStart(timeout, callback, userdata) ⇒ <code>int</code>
Start a new one-shot timer.<br>Once callback is triggered, id is no longer valid.

**Kind**: global function  
**Returns**: <code>int</code> - Id of the started timer<br>&nbsp;&nbsp; id - The operation succeeded<br>&nbsp;&nbsp; timer.INVALID_ID - The operation failed.  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>int</code> | Timeout in milliseconds |
| callback | [<code>TimerCallback</code>](#TimerCallback) | Callback when timer elapses |
| userdata | <code>any</code> | Data passed to the callback |

<a name="TimerStartReoccurring"></a>

## TimerStartReoccurring(timeout, callback, userdata) ⇒ <code>int</code>
Start a new re-occurring timer.<br>Will trigger forever or until stopped.

**Kind**: global function  
**Returns**: <code>int</code> - Id of the started timer<br>&nbsp;&nbsp; id - The operation succeeded<br>&nbsp;&nbsp; timer.INVALID_ID - The operation failed.  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>int</code> | Timeout in milliseconds |
| callback | [<code>TimerCallback</code>](#TimerCallback) | Callback when timer elapses |
| userdata | <code>any</code> | Data passed to the callback |

<a name="TimerStop"></a>

## TimerStop(id) ⇒ <code>void</code>
Stops a running timer.<br>Works for both one-shot and re-occurring timers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Id of the started timer |

<a name="TimerCallback"></a>

## TimerCallback ⇒ <code>void</code>
Callback object for elapsed timer.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>int</code> | Timer id. |
| userdata | <code>any</code> | Data from the original call. |

