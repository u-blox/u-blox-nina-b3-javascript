let gpio =
{
    open: ffi('int mjsApiGpioOpen(int, int, int)'),
    openWithCallback: ffi('int mjsApiGpioOpenWithCallback(int, int, int, void ()(int, int, userdata), userdata)'),
    del: ffi('int mjsApiGpioDelete(int)'),
    set: ffi('int mjsApiGpioSet(int, int)'),
    get: ffi('int mjsApiGpioGet(int)'),
    isOpen: ffi('int mjsApiGpioIsOpen(int)'),
    isValid: ffi('int mjsApiGpioIsValid(int)'),

	RESULT_OK: 0,
    RESULT_ERROR: -1,
	
    VALUE_INVALID: -1,
    VALUE_LOW: 0,
    VALUE_HIGH: 1,

    MODE_INVALID: 0,
    MODE_INPUT_PU: 1,
    MODE_INPUT_PD: 2,
    MODE_INPUT_FLOAT: 3,
    MODE_OUTPUT: 4,

    EDGE_NONE: 0,
    EDGE_FALLING: 1,
    EDGE_RISING: 2,
    EDGE_BOTH: 3,
};


/**
* Open a GPIO pin.
* @param {int} pin - Module pin number.
* @param {int} mode - Pin mode.
* @param {int} value - Initial value for output pin.
* @return {int} Result
* <br>&nbsp;&nbsp; gpio.RESULT_OK
* <br>&nbsp;&nbsp; gpio.RESULT_ERROR
*/
let GpioOpen = function(pin, mode, value) {
    return gpio.open(pin, mode, value);
};

/**
* Open a GPIO pin with a callback.
* @alias GpioCallback
* @param {int} pin - Module pin number.
* @param {int} edge - Trigger edge.
* @param {int} mode - Pin mode.
* @param {triggerCallback} callback - Callback.
* @param {any} userdata - Identifier when callback is triggered. Can be any type.
* @return {int} Result
* <br>&nbsp;&nbsp; gpio.RESULT_OK
* <br>&nbsp;&nbsp; gpio.RESULT_ERROR
*/
let GpioOpenWithCallback = function(pin, edge, mode, callback, userdata) {
    return gpio.openWithCallback(pin, edge, mode, callback, userdata);
};

/**
* Callback object.
* @callback triggerCallback
* @param {int} pin - Pin that triggered the callback
* @param {int} value - New value of the pin
* @param {any} userdata - Userdata from the original call
* @return {any} Result
*/
let GpioCallback = function(pin, value, userdata) {};

/**
* Delete a GPIO object.
* @param {int} pin - Module pin number.
* @return {int} Result
* <br>&nbsp;&nbsp; gpio.RESULT_OK
* <br>&nbsp;&nbsp; gpio.RESULT_ERROR
*/
let GpioDelete = function(pin) {
    return gpio.del(pin);
};

/**
* Set pin state on an open output pin.
* @param {int} pin - Module pin number.
* @param {int} value - Valid:
* <br>&nbsp;&nbsp; gpio.VALUE_LOW
* <br>&nbsp;&nbsp; gpio.VALUE_HIGH
* @return {int} Result
* <br>&nbsp;&nbsp; gpio.RESULT_OK
* <br>&nbsp;&nbsp; gpio.RESULT_ERROR
*/
let GpioSet = function(pin, value) {
    return gpio.set(pin, value);
};

/**
* Get the value of an open pin.
* @param {int} pin - Module pin number.
* @return {int} Value
* <br>&nbsp;&nbsp; gpio.VALUE_INVALID
* <br>&nbsp;&nbsp; gpio.VALUE_LOW
* <br>&nbsp;&nbsp; gpio.VALUE_HIGH
*/
let GpioGet = function(pin) {
    return gpio.get(pin);
};

/**
* Check if a pin is open.
* @param {int} pin - Module pin number.
* @return {int} Result
* <br>&nbsp;&nbsp; gpio.RESULT_OK
* <br>&nbsp;&nbsp; gpio.RESULT_ERROR
*/
let GpioIsOpen = function(pin) {
    return gpio.isOpen(pin);
};

/**
* Check if a pin is valid.
* @param {int} pin - Module pin number.
* @return {int} Result
* <br>&nbsp;&nbsp; gpio.RESULT_OK
* <br>&nbsp;&nbsp; gpio.RESULT_ERROR
*/
let GpioIsValid = function(pin) {
    return gpio.isValid(pin);
};
