import { CategoryAdd, CategoryListGet } from "../services/book.service"


export const Addcategory = (data) => async dispatch => {
  try{
    let result = await CategoryAdd(data)
    dispatch({ 
      type: 'CATEGORY_ADD',
      payload: result
    })
  }
  catch(err){
    return err
  }
 

}

export const GetCategory = () => async dispatch => {
  try{
    let result = await CategoryListGet()
    dispatch({ 
      type: 'CATEGORY_GET',
      payload: result
    })
  }
  catch(err){
    return err
  }
 

}
