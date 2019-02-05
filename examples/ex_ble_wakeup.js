/* (c) u-blox 2018 BLE Scripting Examples
 * Filename   : ex_ble_wakeup.js
 * Description: A remote BLE device opens the UART and wakes up a system using a passphrase
 *              It closes the UART when another phrase is sent. Use u-blox BLE app to test
 * */

/* Libraries used listed below. Uncomment or add to your init.js */

/* 
load('ubx_gpio.js');
load('nina_b3_pins.js');
load('ubx_ble_sec.js');
load('ubx_ble_gap.js');
load('ubx_misc.js');
load('ubx_system.js');
load('ubx_stream.js');
load('ubx_gateway.js');
 */

 print("BLE Wakeup test");

let openphrase = "enable";
let closephrase = "disable";
let uartUrl = "com://com1/?settings=115200,8,1,none,ctsrts&misc=true,0,500";

/* by default, the module has an AT stream and debug stream 
   and the UART stream is connected to every other stream */
let atId = StreamGetAtId();
let debugId = StreamGetDebugId();
let spsStreamId = -1;

let uartStreamCallback = function (id, evt, param, data, userdata) {
};

let disableUART = function () {
    let foundId = StreamGetUartId();
    StreamDisconnect(foundId); //close UART stream
    GatewayRelease(foundId); //remove connections from UART to AT stream and debug stream

    /* release all resources */
    StreamDestroy(foundId);
    GatewayRelease(atId);
    GatewayRelease(debugId);
    SystemSetSysTickMode(system.SYSTEM_SYS_TICK_MODE_LOW);
};

let enableUART = function () {
    SystemSetSysTickMode(system.SYSTEM_SYS_TICK_MODE_HIGH);

    /* Create the UART stream with its source (input) and destination (output) channels */
    let idUart = StreamCreate(uartUrl, uartStreamCallback, 0);
    StreamConnect(idUart);
    let res = GatewayBind(idUart, gateway.NEW_CHANNEL, gateway.NEW_CHANNEL);
    let srcChannel = res.source;
    let dstChannel = res.destination;

    /* Connect the UART to the AT stream and debug stream */
    GatewayBind(atId, dstChannel, srcChannel);
    GatewayBind(debugId, gateway.NEW_CHANNEL, srcChannel);
};

let spsCallback = function(id, evt, param, data, userdata) {
    if (evt === stream.CALLBACK_EVENT_CONNECTION) {
        if (param === stream.CONNECTION_EVT_CONNECTING) {
            StreamConnect(id); //accept incoming request
        } else if (param === stream.CONNECTION_EVT_CONNECTED) {
            GpioSet(ninaB3Pins.BLUE, gpio.VALUE_LOW);
        } else if (param === stream.CONNECTION_EVT_DISCONNECTED) {
            GpioSet(ninaB3Pins.BLUE, gpio.VALUE_HIGH);
        }
    } else if (evt === stream.CALLBACK_EVENT_DATA_AVAILABLE) {
        let s = mkstr(data, param);
        print("data :" + s);
        if(s === openphrase) {
            enableUART();
        } else if(s === closephrase) {
            disableUART();
        }
    } else if (evt === stream.CALLBACK_EVENT_SEND_COMPLETE) {
    }
};

/* Init module */
MiscAtExecute("AT+UBTLE=2");
SystemBleStart();
disableUART();

/* Create the SPS stream */
spsStreamId = StreamCreate("sps://sps", spsCallback, "spsStream");

/* Open GPIO pin as output */
GpioDelete(ninaB3Pins.BLUE);
GpioOpen(ninaB3Pins.BLUE, gpio.MODE_OUTPUT, gpio.VALUE_HIGH);