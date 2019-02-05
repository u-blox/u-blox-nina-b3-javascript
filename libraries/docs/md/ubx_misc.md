<a name="MiscAtExecute"></a>

## MiscAtExecute(command) ⇒ <code>int</code>
Sends an AT command.<br>Only use for settings commands.<br>Any command without a clear OK/ERROR response creates undefined behavior.

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; misc.RESULT_OK<br>&nbsp;&nbsp; misc.RESULT_ERROR  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>string</code> | AT command to execute |

