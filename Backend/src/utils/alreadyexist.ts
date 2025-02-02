import UserModel from "../models/usermodel"
const useralreadyexists = async(user:string):Promise<boolean>=>{
    const exists = await UserModel.findOne({username:user})
    if (exists==null){
      return false
    }
    else {
      return true
    }
}



export default useralreadyexists