# JavaScript libraries

## Usage

Load the needed libraries from your *init.js* file.

For example:

```
load('ubx_system.js');
load('ubx_gpio.js');
```


## BLE GAP library

The GAP library is implemented in the *ubx_ble_gap.js* file.

The BLE GAP library contains operations for GAP operations, for example
scanning for other BLE devices.

[BLE GAP library](ubx_ble_gap.md)

## BLE Security library

The Security library is implemented in the *ubx_ble_sec.js* file.

The BLE Security library contains operations related to Bluetooth Security, like pairing.

[BLE SEC library](ubx_ble_sec.md)

## Gateway library

The Gateway library is implemented in the *ubx_gateway.js* file.

The Gateway library implements gateways for the  u-blox unique Stream concept, that
allows to connect different data streams.

[Gateway library](ubx_gateway.md)

## GATT Server library

The GATT Server library is implemented in the *ubx_gatt_server.js* file.

The GATT Server library contains operations related to GATT services and characteristics.
This involves operations for

* Creating services and characteristics
* Handling callbacks for GATT events

[GATT Server library](ubx_gatt_server.md)

## GPIO library

The GPIO library is implemented in the *ubx_gpio.js* file.

The GPIO library contains operations related to GPIO pins, like

* Reading and setting GPIO pins
* Handling callbacks for GPIO triggers

[GPIO library](ubx_gpio.md)

## Mesh library

The Mesh Library is implemented in the *ubx_mesh.js* file.

The Mesh Library contains functionality for

* Defining and creating the model to be used on the node
* Normal and Reliable Publishing and Replying
* Handling callbacks for Mesh events

[Mesh library](ubx_mesh.md)

## Miscellaneous library

The Miscellaneous library is implemented in the *ubx_misc.js* file.

This library contains functionality for executing AT commands from within the
JavaScript code.

[Miscellaneous library](ubx_misc.md)

## Stream library

The Stream library is implemented in the *ubx_stream.js* file.

The Stream library implements the u-blox stream concept.
Streams are a very powerful way to connect different data streams,
for example taking i2c data from a sensor and send to an SPS stream.

[Stream library](ubx_stream.md)

## System library

The System library is implemented in the *ubx_system.js* file.

This library holds API calls that deals with system behavior, like functions
to set the system in deep sleep, clock operations and checking memory consumption.

[System Documentation](ubx_system.md)

## Timer library

The System library is implemented in the *ubx_timer.js* file.

The Timer library has API Calls for starting and stopping timers.

[Timer library](ubx_timer.md)











