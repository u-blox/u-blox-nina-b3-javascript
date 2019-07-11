/* (c) u-blox 2019 BLE Scripting Examples
 * Filename   : ex_mesh_o_o_s.js
 * Description: Implements a Bluetooh Mesh Generic OnOff server, that controls the RED LED
 * on a NINA-B3 EVK.
 * */

 /* Libraries used listed below. Uncomment or add to your init.js */

/* 
load('nina_b3_pins.js');
load('ubx_gpio.js');
load('ubx_mesh.js');
load('ubx_misc.js');
load('ubx_system.js');
 */
 
 let ledStatus = "\0x00"; // Off=0x00, On=0x01
let redPin = ninaB3Pins.RED;

let assert_are_equal = function (actualValue, expectedValue, errorMessage) {
    if (actualValue !== expectedValue) {
        print(errorMessage);
        die("Error");
    }
};

let setLEDState = function(pin, ledState) {
    // Pins are active low
    if (ledState === 1) {
        GpioSet(pin, gpio.VALUE_LOW);
        ledStatus = "\x01";
    } else {
        GpioSet(pin, gpio.VALUE_HIGH); 
        ledStatus = "0";
    }
};


let reliableStatusCallback = function (reliableId, status, userdata) {
    print("Reliable publish with id ", reliableId, " failed with status ", status);
};

let receiveCallback = function (pMeshDataEvent, userdata) {
    // Convert event to meshDataEventObject type   
    let meshEvent = s2o(pMeshDataEvent, meshEventStructToObject);

    let s = mkstr(meshEvent.pEventData, meshEvent.dataLength);
    // Get OnOff field value
    let onOff = s.at(0);
    
    if (meshEvent.opcode === 0x8201) {   // 0x8201 = Generic OnOff Get
        // Reply with Generic OnOff Status (0x8204)
        MeshReply(meshEvent.eventHdl, "\x82\x04", ledStatus, 1);
    } else if (meshEvent.opcode === 0x8202) { // 0x8202 = Generic OnOff Set
        setLEDState(redPin, onOff);
        // Reply with Generic OnOff Status (0x8204)
        MeshReply(meshEvent.eventHdl, "\x82\x04", ledStatus, 1);
    } else if (meshEvent.opcode === 0x8203) { // Generic OnOff Set Unacknowledged
        setLEDState(redPin, onOff);
    } else {
        print("Unknown message received");
    }
};

let checkMeshModelElementStatus = function() {
    let version = MeshVersionRead();
    let nodeConfig = MeshNodeConfigRead();
    let configStrings = ["Empty", "Mod+Elems1", "Mod+Elems2", "Provisioned", "Configured"];

    print ("Current version", version, "Config state", configStrings[nodeConfig]);

    if (nodeConfig === 0) {
        print("No mesh structure, creating elements & models...");

        // Model index 0, Generic OnOff server, SIG Model ID 0x1000
        MeshModelGenericCreate(0, "\x10\x00");
        
        // Element nr, model index
        // Element #0: Generic OnOff server, model 0
        MeshElementAdd(0,0);
 
        MeshVersionWrite(1);

        MiscAtExecute("AT&W");
        MiscAtExecute("AT+CPWROFF");
        return false;
    } else if (nodeConfig === 1) {
        print("Elements and models need one more reboot...");
        MiscAtExecute("AT+CPWROFF");
        return false;
    } else if (nodeConfig === 2) {
        print("Device needs to be provisioned");
        print("After provisioning, use AT&W and AT+CPWROFF to save local address in flash");
        return false;
    } else if (nodeConfig === 3) {
        print("Mesh node needs to be configured");
        return false;
    }

    print("Mesh node subscribes/publishes to at least one address")
    return true;
};

print("Mesh LED OnOff example");

/* Init module */
MiscAtExecute("AT+UBTLE=2"); //set BLE peripheral
let nameStrCommand = "AT+UBTLN=";
let localAddrStruct = MeshLocalAddressRead();

if (localAddrStruct.numberLocalAddr > 0) {
    nameStrCommand = nameStrCommand + "\"u-blox Tag 0x" + localAddrStruct.localAddr + "\"";
} else {
    nameStrCommand = nameStrCommand + "\"u-blox Mesh Tag\""; // If unprovisioned
}

MiscAtExecute(nameStrCommand);
print ("Executed " + nameStrCommand);

let result = SystemBleStart();
assert_are_equal(result, system.RESULT_OK, "BLE system start failed");
result = SystemMeshStart()
assert_are_equal(result, system.RESULT_OK, "Mesh start failed");

let doMesh = checkMeshModelElementStatus();

if (doMesh) {
    MeshSetDataEventCallback(receiveCallback, "receiveCallback");
    MeshSetReliableEventCallback(reliableStatusCallback, "reliableStatusCallback");

    /* Configure GPIO pin */
    GpioDelete(redPin);
    result = GpioOpen(redPin, gpio.MODE_OUTPUT, gpio.VALUE_HIGH);
    assert_are_equal(result, gpio.RESULT_OK, "redPin creation failed");

    print("Ready to toggle LED...");

    setLEDState(redPin, 1);

    // Print information for debug purposes
	let availableHeap = SystemGetAvailHeap();
    let devInfo = MeshDeviceInfoRead();
	print("Available heap", availableHeap);
    print("Dev Info", devInfo.companyId, devInfo.productId, devInfo.versionId);
}

