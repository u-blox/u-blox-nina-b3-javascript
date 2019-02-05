let timer =
{
    start: ffi('int mjsApiTimerStart(int, void ()(int, userdata), userdata)'),
    startReoccurring: ffi('int mjsApiTimerStartReoccurring(int, void ()(int, userdata), userdata)'),
    stop: ffi('void mjsApiTimerStop(int)'),

    INVALID_ID: -1,
};

/**
* Start a new one-shot timer.<br>
* Once callback is triggered, id is no longer valid.
* @param {int} timeout - Timeout in milliseconds
* @param {TimerCallback} callback - Callback when timer elapses
* @param {any} userdata - Data passed to the callback
* @return {int} Id of the started timer
* <br>&nbsp;&nbsp; id - The operation succeeded
* <br>&nbsp;&nbsp; timer.INVALID_ID - The operation failed.
*/
let TimerStart = function(timeout, callback, userdata) {
    return timer.start(timeout, callback, userdata);
};

/**
* Start a new re-occurring timer.<br>
* Will trigger forever or until stopped.
* @param {int} timeout - Timeout in milliseconds
* @param {TimerCallback} callback - Callback when timer elapses
* @param {any} userdata - Data passed to the callback
* @return {int} Id of the started timer
* <br>&nbsp;&nbsp; id - The operation succeeded
* <br>&nbsp;&nbsp; timer.INVALID_ID - The operation failed.
*/
let TimerStartReoccurring = function(timeout, callback, userdata) {
    return timer.startReoccurring(timeout, callback, userdata);
};

/**
* Stops a running timer.<br>
* Works for both one-shot and re-occurring timers.
* @param {int} id - Id of the started timer
* @return {void}
*/
let TimerStop = function(id) {
    return timer.stop(id);
};

/**
* Callback object for elapsed timer.
* @callback TimerCallback
* @param {int} id - Timer id.
* @param {any} userdata - Data from the original call.
* @return {void}
*/
let TimerCallback = function(id, userdata) {};
