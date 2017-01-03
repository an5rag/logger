const axios = require('axios');
const fileDownload = require('react-file-download');
//const API_ADDRESS = "http://ec2-35-162-212-76.us-west-2.compute.amazonaws.com:4000/api";
//const API_ADDRESS = "http://localhost:4000/api";
import API_ADDRESS from './../../config';

// MAIN ACTIONS
export const PAGE_LOADING = 'PAGE_LOADING';
export const PAGE_LOADED = 'PAGE_LOADED';
export const ENTRIES_LOADING = 'ENTRIES_LOADING';
export const ENTRIES_LOADED = 'ENTRIES_LOADED';

// USER ACTIONS
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const LOGGING = 'LOGGING';
export const NOT_LOGGING = 'NOT_LOGGING';


// LINE ACTIONS
export const SET_LINES = 'SET_LINES';
export const SET_CURRENT_LINE = 'SET_CURRENT_LINE';

// EMPLOYEE ACTIONS


// ENTRY FORM ACTIONS
export const UPDATE_ENTRY_FORM_GLOBAL = 'UPDATE_ENTRY_FORM_GLOBAL';
export const UPDATE_ENTRY_FORM_INITIAL = 'UPDATE_ENTRY_FORM_INITIAL';
export const UPDATE_ENTRY_FORM_POST = 'UPDATE_ENTRY_FORM_POST';
export const CLEAR_ENTRY_FORM = 'CLEAR_ENTRY_FORM';
export const CLEAR_INITIAL_ENTRY_FORM = 'CLEAR_INITIAL_ENTRY_FORM';
export const SET_ENTRY_FORM_VALID = 'SET_ENTRY_FORM_VALID';

// ENTRIES
const SET_ENTRIES = 'SET_ENTRIES';
const SET_ENTRIES_IN_PROGRESS = 'SET_ENTRIES_IN_PROGRESS';
const SET_CURRENT_ENTRY = 'SET_CURRENT_ENTRY';
const CLEAR_ALL_ENTRIES= 'CLEAR_ALL_ENTRIES';

// MODALS
const OPEN_POST_ENTRY_MODAL = 'OPEN_POST_ENTRY_MODAL';
const CLOSE_POST_ENTRY_MODAL = 'CLOSE_POST_ENTRY_MODAL';
export const MODAL_LOADING = 'MODAL_LOADING';
export const MODAL_LOADED = 'MODAL_LOADED';
export const OPEN_ERROR_MODAL = 'OPEN_ERROR_MODAL';
export const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';


// ---------------------------------------------------------  PAGE

const pageLoading = ()=> {
    return {
        type: PAGE_LOADING
    };
};

const pageLoaded = ()=> {
    return {
        type: PAGE_LOADED
    };
};

const entriesLoading = ()=> {
    return {
        type: ENTRIES_LOADING
    };
};

const entriesLoaded = ()=> {
    return {
        type: ENTRIES_LOADED
    };
};

const modalLoading = ()=> {
    return {
        type: MODAL_LOADING
    };
};

const modalLoaded = ()=> {
    return {
        type: MODAL_LOADED
    };
};

export const openErrorModal = (title, message, serverError) => {
    return {
        type: OPEN_ERROR_MODAL,
        message,
        title,
        serverError
    };
}

export const closeErrorModal = () => {
    return {
        type: CLOSE_ERROR_MODAL
    };
}

// ---------------------------------------------------------  USER

const logging = ()=> {
    return {
        type: LOGGING
    };
};

const notLogging = ()=> {
    return {
        type: NOT_LOGGING
    };
};

const setUser = (token, name, username, userType) => {
    return {
        type: SET_USER,
        username,
        name,
        token,
        userType
    };
};

export const login = (username, password) => {
    const request = axios.post(API_ADDRESS + '/user/authenticate', {username, password});

    return (dispatch) => {
        dispatch(logging());
        request.then(
            response => {
                dispatch(setUser(response.data.token, response.data.name, response.data.username, response.data.userType))
                dispatch(notLogging());
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(notLogging());
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(notLogging());
                    dispatch(openErrorModal( 'Login Error','Invalid Username or Password.'));
                }
            }
        )
    }
};
// --------------------------------------------------------- EMPLOYEE

export const createEmployee = (req, callback) => {
    return (dispatch) => {
        axios.post(API_ADDRESS + '/user/register', req)
            .then(
                function (response) {
                    if(callback)
                        callback(response, null);
                },
                error => {
                    let e = {...error};
                    if(e.response == undefined){
                        dispatch(openErrorModal('Network Error', '',true));
                        callback(null, error.response.data);
                    }
                    else{
                        dispatch(openErrorModal( 'Error Creating Employee',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                        callback(null, error.response.data);
                    }
                }
            )
    }
};

// ---------------------------------------------------------  LINE


export const fetchLines = () => {

    return (dispatch, getState) => {
        dispatch(pageLoading());
        const { user } = getState();
        const config = {
            params: {'token': user.token}
        };

        axios.get(API_ADDRESS + '/line'
            , config
        )
            .then((response)=> {
                dispatch(setLines(response.data.lines));
            }, (err) => {
                dispatch(pageLoaded());
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error while Fetching Lines', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Fetching Lines',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            })
            .then(()=> {
                dispatch(pageLoaded());
            });
    };

};

export const setCurrentLine = (line) => {
    return {
        type: SET_CURRENT_LINE,
        line
    }
};

const setLines = (lines) => {
    return {
        type: SET_LINES,
        lines
    }
};

export const changeLine = (line) => {
    return (dispatch) => {
        dispatch(setCurrentLine(line));
        dispatch(clearEntryForm());
        dispatch(fetchAllEntries());
    }
};

export const createLine = (req) => {
    return (dispatch) => {
        axios.post(API_ADDRESS + '/line', req)
            .then(function (response) {
                dispatch(setCurrentLine(response.data.line));
                dispatch(fetchLines());
                dispatch(clearEntryForm());
                dispatch(fetchAllEntries());
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Creating Line',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
    }
};

export const deleteLine = () => {
    return (dispatch, getState) => {
        const {lines} = getState();
        const id = lines.currentLine._id;
        axios.delete(API_ADDRESS + '/line' +`/${id}`)
            .then(function (response) {
                dispatch(setCurrentLine(null));
                dispatch(fetchLines());
                dispatch(clearEntryForm());
                dispatch(clearAllEntries());
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Deleting Line',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        );
    }
};

export const updateLine = (req) => {
    return (dispatch, getState) => {
        const {lines} = getState();
        const id = lines.currentLine._id;
        req = {...req, id};
        axios.put(API_ADDRESS + '/line', req)
            .then(function (response) {
                dispatch(setCurrentLine(response.data.line));
                dispatch(fetchLines());
                dispatch(clearEntryForm());
                dispatch(fetchAllEntries());
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Updating Line',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
    }
};


// ---------------------------------------------------------  ENTRY_FORM

export const updateEntryFormGlobal = (formData) => {
    return {
        type: UPDATE_ENTRY_FORM_GLOBAL,
        formData
    }
};


export const updateEntryFormInitial = (formData) => {
    return {
        type: UPDATE_ENTRY_FORM_INITIAL,
        formData
    }
};

export const updateEntryFormPost = (formData) => {
    return {
        type: UPDATE_ENTRY_FORM_POST,
        formData
    }
};

export const updateEntryFormInitialAndFetch = (formData) => {
    return (dispatch, getState) => {
        dispatch(updateEntryFormInitial(formData));
        dispatch(fetchEntries());
    }
};


export const clearEntryForm = () => {
    return {
        type: CLEAR_ENTRY_FORM
    }
};

export const setEntryFormValid = (isValid) => {
    return {
        type: SET_ENTRY_FORM_VALID,
        valid: isValid
    }

};

export const clearInitialEntryForm = () => {
    return {
        type: CLEAR_INITIAL_ENTRY_FORM
    }
};

export const submitEntryForm = () => {
    return (dispatch, getState) => {
        dispatch(pageLoading());
        const {user, lines, entryForm} = getState();
        const constraints = Object.assign({}, entryForm.initial, entryForm.global);

        const entry = {
            lineId: lines.currentLine._id,
            lineName: lines.currentLine.name,
            constraints,
            'Employee Clock In': user.username,
            'System Clock In': new Date()
        };

        axios.post(API_ADDRESS + '/entry', entry)
            .then((response)=> {
                dispatch(clearEntryForm());
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Creating Entry',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
            .then(()=> {
                dispatch(pageLoaded());
                dispatch(fetchAllEntries());
            })
        ;

    }
};

export const submitPostEntryForm = (clockOut) => {
    return (dispatch, getState) => {
        dispatch(modalLoading());
        const {user, lines, entryForm, entries} = getState();
        const currentEntryId = entries.currentEntry._id;

        const entry = {
            ...entryForm.post,
        };

        if (clockOut) {
            entry['Employee Clock Out'] = user.username;
            entry['System Clock Out'] = new Date();
            entry['inProgress'] = false;
        }

        axios.put(API_ADDRESS + '/entry/?id=' + currentEntryId, entry)
            .then((response)=> {
                dispatch(clearEntryForm());
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Creating Line',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
            .then(()=> {
                dispatch(modalLoaded());
                dispatch(closePostEntryModal());
                dispatch(fetchAllEntries());
            })
        ;

    }
};


// ---------------------------------------------------------  ENTRIES


const formatEntries = (response, line) => {
    const serverCount = response.data.count;
    const entries = response.data.entries;
    const tableColumns = [];
    tableColumns.push(
        'System Clock In',
        'Employee Clock In',
        'System Clock Out',
    );


    for (let i = 0; i < line.constraints.length; i++) {
        const element = line.constraints[i];
        if (element.isDisplayed) {
            tableColumns.push(element.name);
        }
    }

    const tableRows = [];
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const currentRow = [];
        for (let j = 0; j < tableColumns.length; j++) {
            if (entry[tableColumns[j]] != undefined) {
                currentRow.push(entry[tableColumns[j]]);
            } else {
                currentRow.push('N/A');
            }
        }
        tableRows.push(
            {
                id: entry._id,
                data: currentRow
            }
        );
    }

    const clientCount = tableRows.length;

    return {
        tableColumns,
        tableRows,
        clientCount,
        serverCount
    };

};

export const fetchEntries = () => {
    return (dispatch, getState) => {
        dispatch(entriesLoading());
        const {lines, entryForm} = getState();

        if (!lines.currentLine) {
            return dispatch(entriesLoaded());
        }

        const query = {lineId: lines.currentLine._id, limit: 25};
        for (let key in entryForm.initial) {
            if (entryForm.initial[key])
                query[key] = entryForm.initial[key];
        }

        axios.get(API_ADDRESS + '/entry', {
            params: query
        })
            .then((response)=> {
                const result = formatEntries(response, lines.currentLine);
                dispatch(setEntries(result));
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Fetching Entries',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
            .then(()=> {
                dispatch(entriesLoaded());
            });
        return Promise.resolve();
    };
};

export const fetchEntriesInProgress = () => {
    return (dispatch, getState) => {
        dispatch(entriesLoading());
        const {lines} = getState();

        if (!lines.currentLine) {
            return dispatch(entriesLoaded());
        }

        const query = {
            lineId: lines.currentLine._id,
            limit: 50,
            inProgress: true
        };

        axios.get(API_ADDRESS + '/entry', {
            params: query
        })
            .then((response)=> {
                const result = formatEntries(response, lines.currentLine);
                dispatch(setEntriesInProgress(result));
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Fetching Entries in Progress',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
            .then(()=> {
                dispatch(entriesLoaded());
            });
        return Promise.resolve();
    };
};

export const fetchAllEntries = () =>{
    return (dispatch) => {
        dispatch(fetchEntries());
        dispatch(fetchEntriesInProgress());
    };
};

export const fetchCurrentEntry = (id) => {

    return (dispatch, getState) => {
        axios.get(API_ADDRESS + '/entry', {
            params: {
                _id: id
            }
        })
            .then((response)=> {
                dispatch(setCurrentEntry(response.data.entries[0]));
            }, (err) => {

            })
            .then(()=> {
                dispatch(openPostEntryModal());
            })
        ;

    };

};

export const fetchCsv = (req) => {
    return (dispatch, getState) => {
        const {lines} = getState();

        if (!lines.currentLine) {
            return dispatch(openErrorModal('Error Exporting to .csv', 'Did you choose a line?'));

        }

        const query = {
            lineId: lines.currentLine._id,
            ...req
        };

        axios.get(API_ADDRESS + '/entry/export', {
            params: query
        })
            .then((response)=> {
                fileDownload(response.data, 'export.csv');
            },
            error => {
                let e = {...error};

                if(e.response == undefined){
                    dispatch(openErrorModal('Network Error', '',true));
                }
                else{
                    dispatch(openErrorModal( 'Error Exporting to .csv',`The server responded with the error: ${e.response.data.error}: ${e.response.data.message}`));
                }
            }
        )
        return Promise.resolve();
    };
};

const setCurrentEntry = (entry) => {
    return {
        type: SET_CURRENT_ENTRY,
        entry
    }
};

const setEntries = (entries) => {
    return {
        type: SET_ENTRIES,
        entries
    }
};

const clearAllEntries = () => {
    return {
        type: CLEAR_ALL_ENTRIES
    }
};

const setEntriesInProgress = (entries) => {
    return {
        type: SET_ENTRIES_IN_PROGRESS,
        entries
    }
};

// ---------------------------------------------------------  MODALS

export const openPostEntryModal = () => {
    return {
        type: OPEN_POST_ENTRY_MODAL
    }
};

export const closePostEntryModal = () => {
    return dispatch => {
        dispatch({type: CLOSE_POST_ENTRY_MODAL});
        dispatch(clearEntryForm());
    }
};
