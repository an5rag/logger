const axios = require('axios');

// MAIN ACTIONS
export const PAGE_LOADING = 'PAGE_LOADING';
export const PAGE_LOADED = 'PAGE_LOADED';

// USER ACTIONS
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const LOGGING = 'LOGGING';

// LINE ACTIONS
export const SET_LINES = 'SET_LINES';
export const SET_CURRENT_LINE = 'SET_CURRENT_LINE';


// ENTRY FORM ACTIONS
export const UPDATE_ENTRY_FORM_GLOBAL = 'UPDATE_ENTRY_FORM_GLOBAL';
export const UPDATE_ENTRY_FORM_INITIAL = 'UPDATE_ENTRY_FORM_INITIAL';
export const CLEAR_ENTRY_FORM = 'CLEAR_ENTRY_FORM';

// ENTRIES
const SET_ENTRIES = 'SET_ENTRIES';
const SET_CURRENT_ENTRY = 'SET_CURRENT_ENTRY';
const SET_IN_PROGRESS_ENTRIES = 'SET_IN_PROGRESS_ENTERIES';

// MODALS
const OPEN_POST_ENTRY_MODAL = 'OPEN_POST_ENTRY_MODAL';
const CLOSE_POST_ENTRY_MODAL = 'CLOSE_POST_ENTRY_MODAL';


// ---------------------------------------------------------  MAIN

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

// ---------------------------------------------------------  USER

const logging = ()=> {
    return {
        type: LOGGING
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
    const request = axios.post('http://localhost:4000/api/user/authenticate', {username, password});

    return (dispatch) => {
        dispatch(logging());
        request.then(
            response => dispatch(setUser(response.data.token, response.data.name, response.data.username, response.data.userType)),
        )

    }
};

// ---------------------------------------------------------  LINE


export const fetchLines = () => {

    return (dispatch, getState) => {
        dispatch(pageLoading());
        const {user} = getState();
        const config = {
            params: {'token': user.token}
        };

        axios.get('http://localhost:4000/api/line'
            , config
        )
            .then((response)=> {
                dispatch(setLines(response.data.lines));
            }, (err) => {

            })
            .then(()=> {
                dispatch(pageLoaded());
            })
        ;

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

const clearEntryForm = () => {
    return {
        type: CLEAR_ENTRY_FORM
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
            creator: user.username,
            createdOn: new Date()
        };

        axios.post('http://localhost:4000/api/entry', entry)
            .then((response)=> {
                dispatch(clearEntryForm());
            }, (err) => {

            })
            .then(()=> {
                dispatch(pageLoaded());
                dispatch(fetchEntries());
            })
        ;

    }
};

// ---------------------------------------------------------  ENTRIES


export const fetchEntries = (query) => {

    return (dispatch, getState) => {
        dispatch(pageLoading());
        const {lines} = getState();

        axios.get('http://localhost:4000/api/entry', {
            params: {
                lineId: lines.currentLine._id
            }
        })
            .then((response)=> {

                const entries = response.data.entries;
                const tableColumns = [];
                tableColumns.push(
                    'createdOn',
                    'inProgress',
                    'creator',
                    'endedOn',
                );

                const line = lines.currentLine;
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

                const result = {
                    tableColumns,
                    tableRows
                };

                dispatch(setEntries(result));
            }, (err) => {

            })
            .then(()=> {
                dispatch(pageLoaded());
            })
        ;

    };

};

export const fetchCurrentEntry = (id) => {

    return (dispatch, getState) => {
        axios.get('http://localhost:4000/api/entry', {
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

// ---------------------------------------------------------  MODALS

export const openPostEntryModal = () => {
    return {
        type: OPEN_POST_ENTRY_MODAL
    }
};

export const closePostEntryModal = () => {
    return {
        type: CLOSE_POST_ENTRY_MODAL
    }
};