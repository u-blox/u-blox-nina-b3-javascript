let system =
{
    bleStart: ffi('int mjsApiSystemBleStart(void)'),
    getAvailHeap: ffi('int mjsApiSystemGetAvailHeap(void)'),
    setSysTickMode: ffi('int mjsApiSystemSetSysTickMode(int)'),
    deepSleep: ffi('int mjsApiSystemDeepSleep(int)'),
    getRetentionValue: ffi('int mjsApiSystemGetRetentionValue(int)'),
    setRetentionValue: ffi('int mjsApiSystemSetRetentionValue(int, int)'),

    RESULT_OK: 0,
    RESULT_ERROR: -1,
    RESULT_OUT_OF_RANGE: 0xFFFFFFFF,

    SYSTEM_SYS_TICK_MODE_HIGH: 0,
    SYSTEM_SYS_TICK_MODE_LOW: 1,
};

/**
* Starts the BLE stack.
* Use AT command to configure prior to this call,
* once started no reconfigure is possible.
* @return {int} Result
*/
let SystemBleStart = function () {
    return system.bleStart();
};

/**
* Returns available heap that can be useful during development.
* The heap area consists of a pool with different sizes.
* @return {int} Available total heap size for all sizes combined
*/
let SystemGetAvailHeap = function () {
    return system.getAvailHeap();
};

/**
* Set sys tick mode
* LOW decreases power consumption but will have undefined behavior on
* the UART so should only be used when UART is off.
* @param {int} mode
* <br>&nbsp;&nbsp; SYSTEM_SYS_TICK_MODE_HIGH
* <br>&nbsp;&nbsp; SYSTEM_SYS_TICK_MODE_LOW
* @return {int} Result
* <br>&nbsp;&nbsp; system.RESULT_OK
* <br>&nbsp;&nbsp; system.RESULT_ERROR
*/
let SystemSetSysTickMode = function (mode) {
    return system.setSysTickMode(mode);
};

/**
* Go to deep sleep.<br>
* Put module in deep sleep, this is the lowest power mode.
* @param {int} pin Wakeup pin, a trigger on this pin will
* wake the module (Note: Use SYSTEM_DEFAULT_DSR_PIN for DSR)
* @return {int} Result
* <br>&nbsp;&nbsp; system.RESULT_OK
* <br>&nbsp;&nbsp; system.RESULT_ERROR
*/
let SystemDeepSleep = function (pin) {
    return system.deepSleep(pin);
};

/**
* Retrieve a stored value.
* @param {int} index Index of the value, valid numbers are 0..19.
* @return {int} Value
* <br>&nbsp;&nbsp; system.RESULT_OUT_OF_RANGE Invalid range
*/
let SystemGetRetentionValue = function (index) {
    return system.getRetentionValue(index);
};

/**
* Store a value.<br>
* Values set with this commands survives a deep sleep cycle.
* @param {int} index Index of the value, valid numbers are 0..19.
* @param {int} value Value to be stored.
* @return {int} Result
* <br>&nbsp;&nbsp; system.RESULT_OK
* <br>&nbsp;&nbsp; system.RESULT_ERROR
*/
let SystemSetRetentionValue = function (index, value) {
    return system.setRetentionValue(index, value);
};
