import { useEffect, useReducer } from "react";


enum ReducerEnum {
  ERROR,
  SUCCESS,
  ADDNEW
}
interface IStateModel  {
  loading:boolean,
  error:boolean,
  itemList:any
}
interface IReducerAction {
  type:ReducerEnum,
  payload?:any
};

const initialState = <TValue,>(initialValue:TValue) => ({
  loading:true,
  error:false,
  itemList:initialValue
})

const reducer = (state:IStateModel, action:IReducerAction):IStateModel => {
  switch (action.type) {
    case ReducerEnum.ERROR:
      return {
				...state,
        loading: false,
				error:true,
			}
    case ReducerEnum.SUCCESS:
      return {
        ...state,
        loading: false,
        itemList:action.payload
      }
    case ReducerEnum.ADDNEW:
      return {
        ...state,
        itemList:action.payload
      };
    default:
      return {
				...state,
			}
  }
}

function useLocalStorage<TValue>(localName:string, initialValue:TValue) {
  const [state, dispatch] = useReducer(reducer, initialState<TValue>(initialValue));
  const {loading, error, itemList} = state

  const onError = () => {dispatch({type: ReducerEnum.ERROR})}
  const onSuccess = (parsedItems:TValue) => {dispatch({type:ReducerEnum.SUCCESS, payload:parsedItems})}
  const onAddNew = (parsedItems:TValue) => {dispatch({type:ReducerEnum.ADDNEW, payload:parsedItems})}

  const fetchItems = async ():Promise<TValue> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const localStorageItem = localStorage.getItem(localName);
          let parsedItems:TValue = initialValue;

          if(!localStorageItem){
            localStorage.setItem(localName, JSON.stringify(parsedItems));
          } else {
            parsedItems = JSON.parse(localStorageItem);
          }
          onSuccess(parsedItems);
          resolve(parsedItems);
        } catch (error) {
          onError();
          console.error("An error ocurred: ", error);
          reject(error);
        }
      }, 2000);
    })
  }


  const saveItem = (itemList:TValue) => {
    try {
      onAddNew(itemList);
      localStorage.setItem(localName, JSON.stringify(itemList));
    } catch (error) {
      onError();
      console.error("An error ocurred: ", error)
    }
  }

  return {itemList: itemList as TValue, saveItem, fetchItems, loading, error};
}

export {useLocalStorage};