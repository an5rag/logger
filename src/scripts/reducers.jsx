const user = (currentState = {}, action) => {
    switch (action.type) {
        case 'LOGGING':
            return Object.assign({}, currentState, {
                isLogging: true,
                isLoggedIn: false
            });
            break;
        case 'SET_USER':
            return Object.assign({}, currentState, {
                isLogging: false,
                isLoggedIn: true,
                token: action.token,
                name: action.name,
                username: action.username,
                userType: action.userType
            });
            break;
        case 'INVALIDATE_USER':
            return Object.assign({}, currentState, {
                isLogging: false,
                isLoggedIn: false
            });
            break;
        default:
            return currentState;
    }
};

const lines = (currentState = [], action) => {
    switch (action.type) {
        case 'SET_LINES':
            return Object.assign({}, currentState, {
                allLines: action.lines
            });
            break;
        case 'SET_CURRENT_LINE':
            return Object.assign({}, currentState, {
                currentLine: action.line
            });
            break;
        default:
            return currentState;
    }

};

const page = (currentState = {}, action) => {
    switch (action.type) {
        case 'PAGE_LOADING':
            return Object.assign({}, currentState, {
                isLoading: true
            });
            break;
        case 'PAGE_LOADED':
            return Object.assign({}, currentState, {
                isLoading: false
            });
            break;
        case 'ENTRIES_LOADING':
            return Object.assign({}, currentState, {
                entriesLoading: true
            });
            break;
        case 'ENTRIES_LOADED':
            return Object.assign({}, currentState, {
                entriesLoading: false
            });
            break;
        default:
            return currentState;

    }
};

const entryForm = (currentState = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ENTRY_FORM_GLOBAL':
            return Object.assign({}, currentState, {
                global: action.formData
            });
            break;
        case 'UPDATE_ENTRY_FORM_INITIAL':
            return Object.assign({}, currentState, {
                initial: action.formData
            });
            break;
        case 'CLEAR_ENTRY_FORM':
            return {
              submit_status: 'success'
            };
        default:
            return currentState;
    }
};

const entries = (currentState = [], action) => {
    switch (action.type) {
        case 'SET_ENTRIES':
            return Object.assign({}, currentState, {
                allEntries: action.entries
            });
            break;
        case 'SET_CURRENT_ENTRY':
            return Object.assign({}, currentState, {
                currentEntry: action.entry
            });
            break;
        case 'SET_IN_PROGRESS_ENTRIES':
            return Object.assign({}, currentState, {
                inProgressEntries: action.entries
            });
            break;
        default:
            return currentState;
    }

};

const modals = (currentState = [], action) => {
    switch (action.type) {
        case 'OPEN_POST_ENTRY_MODAL':
            return Object.assign({}, currentState, {
                postEntryModal: {
                    open: true
                }
            });
            break;
        case 'CLOSE_POST_ENTRY_MODAL':
            return Object.assign({}, currentState, {
                postEntryModal: {
                    open: false
                }
            });
            break;
        default:
            return currentState;
    }

};

const RootReducer = (state = {}, action) => {
    return {
        page: page(state.page, action),
        user: user(state.user, action),
        lines: lines(state.lines, action),
        entries: entries(state.entries, action),
        entryForm: entryForm(state.entryForm, action),
        modals: modals(state.modals, action)
    }
};

export default RootReducer;