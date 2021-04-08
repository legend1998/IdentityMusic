export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "DELETE_USER":
      localStorage.clear();
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
