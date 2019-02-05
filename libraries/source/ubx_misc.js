let misc =
{
    atExecute: ffi('int mjsApiMiscAtExecute(char*)'),

    RESULT_OK: 0,
    RESULT_ERROR: -1,
};

/**
* Sends an AT command.<br>
* Only use for settings commands.<br>
* Any command without a clear OK/ERROR response creates undefined behavior.
* @param {string} command - AT command to execute
* @return {int} Result
* <br>&nbsp;&nbsp; misc.RESULT_OK
* <br>&nbsp;&nbsp; misc.RESULT_ERROR
*/
let MiscAtExecute = function(command) {
    return misc.atExecute(command);
};
