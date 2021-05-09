export default (state, action) => {
    switch(action.type) {
        case 'ADD_SHIFT':{
            let shifts = [...state.shifts, ...action.payload]
            return {
                ...state,
                shifts
            }
        }
        case 'ADD_MY_SHIFT':{
            let myShifts = [...state.myShifts, ...action.payload]
            return {
                ...state,
                myShifts
            }
        }
        case 'BOOK_MY_SHIFT':{
            let shift = {}
            state.shifts.forEach((s) => {
                if  (s.id === action.payload) {
                    s.booked = true
                    shift = {...s}
                }
            })
            return {
                ...state,
                shifts: [...state.shifts],
                myShifts: [...state.myShifts, shift],
            }
        }
        case 'CANCEL_MY_SHIFT':{
            state.shifts.forEach((s) => {
                if  (s.id === action.payload) {
                    s.booked = false
                }
            })
            return {
                ...state,
                shifts: [...state.shifts],
                myShifts: state.myShifts.filter(s => s.id !== action.payload),
            }
        }
        default:
            return state
    }
}