## Functions

<dl>
<dt><a href="#GatewayBind">GatewayBind()</a> ⇒</dt>
<dd><p>Connects a stream to a source and a destination channel.<br></p>
<p>To do a one-to-one bind, first bind stream A to source channel
1 and destination channel 2 and then connect stream B to
source channel 2 and destination 1.</p>
</dd>
<dt><a href="#GatewayRelease">GatewayRelease(streamId)</a> ⇒ <code>int</code></dt>
<dd><p>Release a stream from its connected channels.<br></p>
</dd>
</dl>

<a name="GatewayBind"></a>

## GatewayBind() ⇒
Connects a stream to a source and a destination channel.<br>To do a one-to-one bind, first bind stream A to source channel1 and destination channel 2 and then connect stream B tosource channel 2 and destination 1.

**Kind**: global function  
**Returns**: Result - Object with result and channels<br>&nbsp;&nbsp; result gateway.RESULT_OK<br>&nbsp;&nbsp; result gateway.RESULT_ERROR<br>&nbsp;&nbsp; source Source channel used<br>&nbsp;&nbsp; destination Destination channel used  

| Type | Description |
| --- | --- |
| <code>int</code> | id Id of the stream |
| <code>int</code> | srcChannel Source channel |
| <code>int</code> | dstChannel Destination channel <br>&nbsp;&nbsp; Use gateway.NEW_CHANNEL if a channel is not known before, the system will provide an unused channel id. (One channel can be known and the other new). |

<a name="GatewayRelease"></a>

## GatewayRelease(streamId) ⇒ <code>int</code>
Release a stream from its connected channels.<br>

**Kind**: global function  
**Returns**: <code>int</code> - Result<br>&nbsp;&nbsp; gateway.RESULT_OK<br>&nbsp;&nbsp; gateway.RESULT_ERROR  
**Note**: Other streams connected to the channels will notbe notified. To release a one-to-one bind, run this commandon both streams.  

| Param | Type | Description |
| --- | --- | --- |
| streamId | <code>int</code> | Stream id |

