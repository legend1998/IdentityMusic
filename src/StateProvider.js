import React, { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();

//important data layer here we are making

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
