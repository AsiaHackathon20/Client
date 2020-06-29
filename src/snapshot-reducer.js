export const initialState = {};

export function loadSnapshot(state, action) {
  switch (action.type) {
    case 'LOAD':
      return {...state};
    default:
      return state ;
  }
}