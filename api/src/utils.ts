import { Student } from "./types/Student";

export const validateUpdateObject = (data: any) => { 
  let dataIsValid = true;
  Object.keys(data).map((item) => {
    if(item !== 'id' && item !== 'name' && item !== 'birth' &&item !== 'email' && item !== 'city') dataIsValid = false;
  })
  
  return dataIsValid;
}