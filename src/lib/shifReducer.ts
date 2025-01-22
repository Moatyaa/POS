import { ShiftState, ShiftAction } from "@/Types/types";

const initialState: ShiftState = {
    isShiftStarted: false,
    pin: '',
    balance: '',
    remainingAmount: '',
};

export const shiftReducer = (state: ShiftState, action: ShiftAction): ShiftState => {
    switch (action.type) {
        case 'TOGGLE_SHIFT':
            return { ...state, isShiftStarted: !state.isShiftStarted };
        case 'SET_PIN':
            return { ...state, pin: action.payload };
        case 'SET_BALANCE':
            return { ...state, balance: action.payload };
        case 'SET_REMAINING_AMOUNT':
            return { ...state, remainingAmount: action.payload };
        case 'SET_RESET':
            return { ...state, pin: '', balance: '', remainingAmount: '' };  // Reset all fields
        default:
            return state;
    }
};

export const getInitialState = (): ShiftState => initialState;  // This is helpful if you need to re-use the initial state elsewhere
