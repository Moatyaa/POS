// useShift.ts
import { useReducer } from 'react';
import { ShiftAction, ShiftState } from "@/Types/types";

const initialState: ShiftState = {
    isShiftSwitched: false,
    pin: '',
    balance: '',
    remainingAmount: '',
};

const shiftReducer = (state: ShiftState, action: ShiftAction): ShiftState => {
    switch (action.type) {
        case 'TOGGLE_SHIFT':
            return { ...state, isShiftSwitched: !state.isShiftSwitched };
        case 'SET_PIN':
            return { ...state, pin: action.payload };
        case 'SET_BALANCE':
            return { ...state, balance: action.payload };
        case 'SET_REMAINING_AMOUNT':
            return { ...state, remainingAmount: action.payload };
        case 'SET_RESET':
            return { ...state, pin: '', balance: '', remainingAmount: '' };
        default:
            return state;
    }
};

export const useShift = () => {
    const [state, dispatch] = useReducer(shiftReducer, initialState);

    const toggleShift = () => {
        dispatch({ type: 'TOGGLE_SHIFT' });
    };

    const setPin = (pin: string) => {
        dispatch({ type: 'SET_PIN', payload: pin });
    };

    const setBalance = (balance: string) => {
        dispatch({ type: 'SET_BALANCE', payload: balance });
    };

    const setRemainingAmount = (remainingAmount: string) => {
        dispatch({ type: 'SET_REMAINING_AMOUNT', payload: remainingAmount });
    };

    const resetFields = () => {
        dispatch({ type: 'SET_RESET' });
    };

    return {
        state,
        toggleShift,
        setPin,
        setBalance,
        setRemainingAmount,
        resetFields,
    };
};
