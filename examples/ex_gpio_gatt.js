/* (c) u-blox 2018 BLE Scripting Examples
 * Filename   : ex_gpio_gatt.js
 * Description: Controls a GPIO connected to three LEDs, through a remote GATT client.
 *              The remote client should have paired with the local device. Toggle SW2 on the EVK to enable pairing.
 *              Use u-blox BLE app or a u-blox NINA-Bx module as a GATT client.
 *              If using an mbed shield for the other examples please REMOVE it while running this example.
 * */

/* Libraries used listed below. Uncomment or add to your init.js */

/* 
load('ubx_gpio.js');
load('ubx_gatt_server.js');
load('nina_b3_pins.js');
load('ubx_ble_sec.js');
load('ubx_misc.js');
load('ubx_system.js');
 */
 
 print("GPIO GATT example");

let ledServiceUUID = "\xff\xd0";
let redLedChar = "\xff\xd1";
let greenLedChar = "\xff\xd2";
let blueLedChar = "\xff\xd3";
let securityLevel = gatts.SECURITY_READ_NON_AUTH + gatts.SECURITY_WRITE_NON_AUTH;

let redPin = ninaB3Pins.RED;
let greenPin = ninaB3Pins.GREEN;
let bluePin = ninaB3Pins.BLUE;
let ctrlPin = ninaB3Pins.SW2;

let result;
let pairingstatus = bleSec.PAIRING_MODE_DISABLED;

let assert_are_equal = function (actualValue, expectedValue, errorMessage) {
    if (actualValue !== expectedValue) {
        print(errorMessage);
        die("Error");
    }
};

let ctrlPinCallback = function (pin, value, userdata) {
    if (pairingstatus === bleSec.PAIRING_MODE_DISABLED) {
        print("Enabling Pairing");
        BleSecSetPairingMode(bleSec.PAIRING_MODE_ENABLED);
        pairingstatus = bleSec.PAIRING_MODE_ENABLED;
    }
    else if (pairingstatus === bleSec.PAIRING_MODE_ENABLED) {
        print("Disabling Pairing");
        BleSecSetPairingMode(bleSec.PAIRING_MODE_DISABLED);
        pairingstatus = bleSec.PAIRING_MODE_DISABLED;
    }
};

let gattEventCallback = function (event, connectionHandle, attributeHandle, length, data, userdata) {
    if (event === gatts.EVENT_CONNECTED) {
        print("Connected to a gatt client");
    } else if (event === gatts.EVENT_DISCONNECTED) {
        print("Gatt client disconnected");
    } else if (event === gatts.EVENT_DATA) {
        let actualData = data.slice(0, length);
        let pin = 0;

        if (attributeHandle === redCharDetails.valueHandle) {
            pin = redPin;
        } else if (attributeHandle === greenCharDetails.valueHandle) {
            pin = greenPin;
        } else if (attributeHandle === blueCharDetails.valueHandle) {
            pin = bluePin;
        }

        if (actualData === "\x01") {
            GpioSet(pin, gpio.VALUE_LOW);
        } else {
            GpioSet(pin, gpio.VALUE_HIGH);
        }
    }
};

/* Init module */
MiscAtExecute("AT+UBTLE=2"); //set BLE peripheral
let result = SystemBleStart();
assert_are_equal(result, system.RESULT_OK, "BLE system start failed");
BleSecSetPairingMode(pairingstatus); //pairing disabled by default. press ctrlPin to enable pairing

/* Create the GATT interface */
GattsSetEventCallback(gattEventCallback, null);
let serviceHandle = GattsServiceCreate(gatts.UUID_TYPE_16, ledServiceUUID);
let redCharDetails = GattsCharacteristicCreate(serviceHandle, gatts.UUID_TYPE_16, redLedChar, gatts.PROPERTY_WRITE, securityLevel, "\x00", 1);
let greenCharDetails = GattsCharacteristicCreate(serviceHandle, gatts.UUID_TYPE_16, greenLedChar, gatts.PROPERTY_WRITE, securityLevel, "\x00", 1);
let blueCharDetails = GattsCharacteristicCreate(serviceHandle, gatts.UUID_TYPE_16, blueLedChar, gatts.PROPERTY_WRITE, securityLevel, "\x00", 1);

if (redCharDetails.result < gatts.RESULT_OK ||
    greenCharDetails.result < gatts.RESULT_OK ||
    blueCharDetails.result < gatts.RESULT_OK) {
    die("Gatt Server failed");
}

/* Configure GPIO pins */
GpioDelete(redPin);
GpioDelete(greenPin);
GpioDelete(bluePin);
result = GpioOpen(redPin, gpio.MODE_OUTPUT, gpio.VALUE_HIGH);
assert_are_equal(result, gpio.RESULT_OK, "redPin creation failed");
result = GpioOpen(greenPin, gpio.MODE_OUTPUT, gpio.VALUE_HIGH);
assert_are_equal(result, gpio.RESULT_OK, "greenPin creation failed");
result = GpioOpen(bluePin, gpio.MODE_OUTPUT, gpio.VALUE_HIGH);
assert_are_equal(result, gpio.RESULT_OK, "bluePin creation failed");

/* Configure gpio pin for pairing */
GpioDelete(ctrlPin);
result = GpioOpenWithCallback(ctrlPin, gpio.EDGE_RISING, gpio.MODE_INPUT_PU, ctrlPinCallback, null);
assert_are_equal(result, gpio.RESULT_OK, "ctrlPin creation failed");
