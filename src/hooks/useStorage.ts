import { StoredTime } from "@src/utils/constants";
import { useReducer } from "react";


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
      try {
        const localStorageItem = localStorage.getItem(localName);
        let parsedItems:TValue = initialValue;

        if(!localStorageItem){
          const newStorage = JSON.stringify(parsedItems).concat(`{||}${new Date().getTime()}`)
          localStorage.setItem(localName, newStorage);
        } else {
          const actualTime = new Date().getTime();
          const oldTime = parseInt(localStorageItem.split(`{||}`)[1]);
          if(actualTime - oldTime > StoredTime){
            deleteItem();
            const newStorage = JSON.stringify(parsedItems).concat(`{||}${new Date().getTime()}`)
            localStorage.setItem(localName, newStorage);
          } else {
            const cleanStorage = localStorageItem.split(`{||}`)[0];
            parsedItems = JSON.parse(cleanStorage);
          }
        }
        onSuccess(parsedItems);
        resolve(parsedItems);
      } catch (error) {
        onError();
        console.error("An error ocurred: useLocalStorage -> fetchItems", error);
        reject(error);
      }
    })
  }


  const saveItem = (itemList:TValue) => {
    try {
      onAddNew(itemList);
      const newStorage = JSON.stringify(itemList).concat(`{||}${new Date().getTime()}`)
      localStorage.setItem(localName, newStorage);
    } catch (error) {
      onError();
      console.error("An error ocurred: useStorage -> saveItem", error)
    }
  }


  const deleteItem = () => {
    localStorage.removeItem(localName);
  }

  return {
    itemList: itemList as TValue,
    loading,
    error,
    saveItem,
    fetchItems,
    deleteItem
  };
}

export {useLocalStorage};