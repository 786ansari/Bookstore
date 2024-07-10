import { AddUserService, DeleteUserService, getUserDataService, UpdateUserService } from "../services/user.service"

export const addUser = (data) => async dispatch => {
        let result = await AddUserService(data)
      dispatch({ 
        type: 'USER_ADD',
        payload: result
    })
    }

    export const getUser = () => async dispatch => {
        let result = await getUserDataService()
      dispatch({ 
        type: 'USER_GET',
        payload: result    
    })
    }

    export const updateUser = (id) => async dispatch => {
        let result = await UpdateUserService(id)
      dispatch({ 
        type: 'USER_UPDATE',
        payload: result    
    })
    }

    export const deleteUser = (id) => async dispatch => {
        let result = await DeleteUserService(id)
      dispatch({ 
        type: 'USER_DELETE',
        payload: result    
    })
    }