/* (c) u-blox 2018 BLE Scripting Examples
 * Filename   : ex_i2c_gatt.js
 * Description: Collects temp data from the LM75B on the mbed Application Shield using I2C stream and sends it securely to a GATT client.
 *              Use u-blox BLE app or a u-blox NINA-Bx module as a GATT client.
 * PreReq     : Mount the mbed shield on the EVK.
 * */

 /* Libraries used listed below. Uncomment or add to your init.js */

/* 
load('ubx_gatt_server.js');
load('ubx_ble_sec.js');
load('ubx_misc.js');
load('ubx_system.js');
load('ubx_stream.js');
load('ubx_gatt_server.js');
load('ubx_gpio.js');
load('nina_b3_pins.js');
*/
 
 print("Arduino shield temperature sensor over GATT I2C example");

let i2c = "i2c://secondary1:72/?freq=100&read_freq=2000&nr_bytes=1&no_stop=true&Init_command=0100&read_command=00";
let i2cStreamId=0;

let ubloxTempServiceUUID = "\xff\xe0";
let ubloxTempCharUUID = "\xff\xe1";
let ubloxTempDesUUID = "\xab\xb8\x94\x81\x16\xb3\x43\xe1\xa0\xd1\xf3\x94\xc8\x06\xd7\xf2";
let securityLevel = gatts.SECURITY_READ_NON_AUTH + gatts.SECURITY_WRITE_NON_AUTH;

let ctrlPin = ninaB3Pins.SW1;
let pairingstatus = bleSec.PAIRING_MODE_DISABLED;

let gapConnectionHandle = -1;
let isGattNotifyEnabled = false;

let assert_are_equal = function (actualValue, expectedValue, errorMessage) {
    if (actualValue !== expectedValue) {
        print(errorMessage);
        die("Error");
    }
};

let erasePeersCallback = function (result, userdata) {
    if(result !== bleSec.RESULT_OK) {
        print("Unbond all failed");
    }
};

let streamEventCallback = function (id, evt, param, data, userdata) {
    if (evt === stream.CALLBACK_EVENT_DATA_AVAILABLE) {
        let s = mkstr(data, param);
        print('Temp is', s.at(0), 'degrees celsius');

        if(!isGattNotifyEnabled) {
            GattsReadResp(gapConnectionHandle, s, param);
            StreamDisconnect(id);
        } else {
            GattsSend(gatts.SEND_NOTIFICATION, gapConnectionHandle, charDetails.valueHandle, s, param);
        }
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
        gapConnectionHandle = connectionHandle;
    } else if (event === gatts.EVENT_DISCONNECTED) {
        print("Gatt client disconnected");
        gapConnectionHandle = -1;
    } else if (event === gatts.EVENT_READ_REQUSET) {
        print("GATT client is reading temperature; Contacting I2C slave");
        result = StreamConnect(i2cStreamId);
        assert_are_equal(result, stream.RESULT_OK_CONNECTING, "Error: Could not connect to " + i2c);
    } else if (event === gatts.EVENT_DATA) {
        let actualData = data.slice(0, length);
        if (attributeHandle === charDetails.cccdHandle && actualData === "\x01") {
            print("Sending notifications everytime sensor data is received");
            StreamConnect(i2cStreamId);
            isGattNotifyEnabled = true;
        } else if (attributeHandle === charDetails.cccdHandle) {
            print("Stoping notifications");
            isGattNotifyEnabled = false;
            StreamDisconnect(i2cStreamId);
        }
    }
};

/* Init module */
MiscAtExecute("AT+UBTLE=2"); //set BLE peripheral
let result = SystemBleStart();
assert_are_equal(result, system.RESULT_OK, "BLE system start failed");
BleSecSetPairingMode(bleSec.PAIRING_MODE_DISABLED); //pairing disabled by default. press ctrlPin to enable pairing

/* Create the i2c stream */
i2cStreamId = StreamCreate(i2c, streamEventCallback, null);
if (i2cStreamId < stream.RESULT_OK) {
    die("Could not create stream, reason:", i2cStreamId);
}

/* Create the GATT interface */
GattsSetEventCallback(gattEventCallback, null);
let serviceHandle = GattsServiceCreate(gatts.UUID_TYPE_16, ubloxTempServiceUUID);
let charDetails = GattsCharacteristicCreate(serviceHandle, gatts.UUID_TYPE_16, ubloxTempCharUUID, gatts.PROPERTY_READ + gatts.PROPERTY_NOTIFY, securityLevel, "", 0);
let descDetails = GattsDescriptorCreate(charDetails.valueHandle, gatts.UUID_TYPE_128, ubloxTempDesUUID, securityLevel, "\x75\x2D\x62\x6C\x6F\x78", 0x6);
if(serviceHandle <= 0 || charDetails.result <= 0 || descDetails <= 0) {
    die("Error: GATT Server creation Failed");
}

/* Configure gpio pins for pairing */
GpioDelete(ctrlPin);
result = GpioOpenWithCallback(ctrlPin, gpio.EDGE_RISING, gpio.MODE_INPUT_PU, ctrlPinCallback, null);
assert_are_equal(result, gpio.RESULT_OK, "ctrlPin creation failed");