// a reducer takes in two things:
// 1. copy of current state
// 2. the action (info about what happened)

function num(state = [], action) {
    switch (action.type) {
        case 'INCREMENT_NUM':
            return state + 1
            
        default:
            return state;
    }
}

export default num;