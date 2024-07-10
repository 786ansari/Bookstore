const initialState = {
    CATEGORYADD:{},
    CATEGORYGET:{},
    BOOK:{}
  }
  export const bookReducer = (state = initialState, action) => {
    console.log("actions",action)
      switch (action.type) {
        case 'CATEGORY_ADD':
          return {...state,  CATEGORYADD: action.payload };
          case 'CATEGORY_GET':
            return {...state,  CATEGORYGET: action.payload };
        default:
          return state;
      }
    };
    