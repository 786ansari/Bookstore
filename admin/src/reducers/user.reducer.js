const initialState = {
    USER:[]
  }
  export const userReducer = (state = initialState, action) => {
    console.log("actions",action)
      switch (action.type) {
        case 'USER_ADD':
          return {...state,  USER: action.payload };
          case 'USER_GET':
          return {...state,  USER: action.payload };
          case 'USER_UPDATE':
          return {...state,  USER: action.payload };
          case 'USER_DELETE':
          return {...state,  USER: action.payload };
        default:
          return state;
      }
    };