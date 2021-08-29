export const setToken = (accessToken) => ({
  type: "ACCESS_TOKEN",
  accessToken,
});
export const initToken = () => ({
  type: "INITIAL_TOKEN",
})

const initalState = {
  accessToken: undefined
};

const token = (state = initalState, action) => {
  switch (action.type) {
    case "INITIAL_TOKEN": {
      return {
        ...state,
        accessToken: undefined
      }
    }
    case "ACCESS_TOKEN":{
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    default:
      return state;
  }
};
export default token;
