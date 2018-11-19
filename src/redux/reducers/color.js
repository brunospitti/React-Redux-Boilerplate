// a reducer takes in two things:
// 1. copy of current state
// 2. the action (info about what happened)

function color(state = [], action) {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return state.map(digit => digit = Math.floor(Math.random() * 255));
        default:
            return state;
    }
}

export default color;