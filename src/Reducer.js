export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  subArtist: {
    artistunlimited: 1,
    advance: 10,
    platinum: 30,
    "White-Label": 100,
  },
  subLabel: {
    artistunlimited: 1,
    advance: 1,
    platinum: 1,
    "White-Label": 100,
  },
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
