let gateway =
{
    bind: ffi('int mjsApiGatewayBind(int, int, int, void*)'),
    release: ffi('int mjsApiGatewayRelease(int)'),

    RESULT_OK: 0,
    RESULT_ERROR: -1,

    NEW_CHANNEL: 99,
};

/**
* The Stream Bind concept.<br>
* Any stream has data flowing in and out of it. Hence every stream
* is made of two channels e.i., source and destination channels
* 
* Source channel
* A stream receives its incoming data on this channel
*
* Destination channel
* A stream sends outgoing data on this channel
*
* The source channel (input) of a stream can be connected to
* one or multiple destination (output) channels of other streams
*
* Example scenario:
* Sending multiple sensors' data to a remote device over SPS stream
* 1. Create and open an SPS stream: stream1, i2c stream from temperature sensor: stream2
     and i2c stream from accelerometer senor: stream3
* 2. Create a new stream1src channel and bind it to stream1
* 3. Create a new stream2dest channel and bind it to stream2
* 4. Create a new stream3dest channel and bind it to stream3
* 5. Bind stream2dest and stream3dest channel to stream1src channels
* The data from stream2 and stream3 should now be directed into stream1
*
*/

/**
* Connects a stream to a source and a destination channel.<br>
*
* To do a one-to-one bind, first bind stream A to source channel
* 1 and destination channel 2 and then connect stream B to
* source channel 2 and destination 1. 
*
* @param {int} - id Id of the stream
* @param {int} - srcChannel Source channel
* @param {int} - dstChannel Destination channel
* <br>&nbsp;&nbsp; Use gateway.NEW_CHANNEL if a channel is not known
* before, the system will provide an unused channel id. (One channel
* can be known and the other new).
* @return Result - Object with result and channels
* <br>&nbsp;&nbsp; result gateway.RESULT_OK
* <br>&nbsp;&nbsp; result gateway.RESULT_ERROR
* <br>&nbsp;&nbsp; source Source channel used
* <br>&nbsp;&nbsp; destination Destination channel used
*/
let GatewayBind = function(id, srcChannel, dstChannel) {
    let out = "      ";
    let result = gateway.bind(id, srcChannel, dstChannel, out);
    let source = out.at(0);
    let destination = out.at(1);
    return {
        result: result,
        source : source,
        destination: destination,
    }
};

/**
* Release a stream from its connected channels.<br>
* @Note Other streams connected to the channels will not
* be notified. To release a one-to-one bind, run this command
* on both streams.
* @param {int} streamId - Stream id
* @return {int} Result
* <br>&nbsp;&nbsp; gateway.RESULT_OK
* <br>&nbsp;&nbsp; gateway.RESULT_ERROR
*/
let GatewayRelease = function(streamId) {
    return gateway.release(streamId);
};

