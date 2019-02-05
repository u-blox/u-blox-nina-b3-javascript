/* (c) u-blox 2018 BLE Scripting Examples
 * Filename   : ex_ble_proximity.js
 * Description: Blinks the BLUE LED on the NINA-B3 EVK when a specific BLE beacon is in close proximity
 * */

 /* Libraries used listed below. Uncomment or add to your init.js */

/* 
load('ubx_gpio.js');
load('nina_b3_pins.js');
load('ubx_ble_sec.js');
load('ubx_ble_gap.js');
load('ubx_misc.js');
load('ubx_system.js');
load('ubx_timer.js');
 */
print("BLE beacon proximity example");

let peerAddress = "0012F3980367p"; //enter remote peer address
let rssiThreshold = -45;
let outGpio = ninaB3Pins.BLUE;
let timeoutMs = 5000;

let peerFound = false;
let LedState = gpio.VALUE_HIGH;
let blinkCount = 0;

let assert_are_equal = function (actualValue, expectedValue, errorMessage) {
    if (actualValue !== expectedValue) {
        print(errorMessage);
        die("Error");
    }
};

let discoverCallback = function (remoteAddr, advType, rssi, data, dataLen, userdata) {
    if(!peerFound) {
        let s = mkstr(data, dataLen);
        if(remoteAddr === peerAddress && rssi > rssiThreshold) {
            // peer is in proximity
            print("Peer data :", s);
            peerFound = true;
            blinkLed();
        }
    }
};

let discoverComplCallback = function (userdata) {
    print("discovery Completed; re-starting discovery");
    peerFound = false;
    BleGapDiscover(bleGap.DISCOVERY_TYPE_GENERAL, bleGap.DISCOVERY_MODE_ACTIVE, timeoutMs);
};

let toggleGpio = function (timerId, userdata) {
    if(LedState === gpio.VALUE_LOW) {
        GpioSet(outGpio, gpio.VALUE_HIGH);
        LedState = gpio.VALUE_HIGH;
        if(blinkCount >= 5) {
            TimerStop(timerId);
            blinkCount = 0;
        }
    } else if (LedState === gpio.VALUE_HIGH) {
        GpioSet(outGpio, gpio.VALUE_LOW);
        LedState = gpio.VALUE_LOW;
        blinkCount++;
    }
};

let blinkLed = function () {
    blinkCount = 0;
    TimerStartReoccurring(200, toggleGpio, null);
};

/* init system */
let res = MiscAtExecute("AT+UBTLE=1"); //set BLE central
assert_are_equal(res, misc.RESULT_OK, "MiscAtExecute: ", res);
res = SystemBleStart();
assert_are_equal(res, system.RESULT_OK, "BLE system start failed");

/* Open GPIO pin as output */
res = GpioOpen(outGpio, gpio.MODE_OUTPUT, LedState);
assert_are_equal(res, gpio.RESULT_OK, "Could not open LED");

/* Start discovery */
BleGapSetDiscoverCallback(discoverCallback, "discoverCallback");
BleGapSetDiscoverComplCallback(discoverComplCallback, "discoverComplCallback");
res = BleGapDiscover(bleGap.DISCOVERY_TYPE_GENERAL, bleGap.DISCOVERY_MODE_ACTIVE, timeoutMs);
assert_are_equal(res, bleGap.RESULT_OK, "Discovery failed");
