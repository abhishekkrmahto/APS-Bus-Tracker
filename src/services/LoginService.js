import { useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { adminCollectionRef } from "../firebase/firebaseConfig";
import { collection,getDoc,getDocs } from "firebase/firestore";
class LoginService{
    login = (email,password)=>{
        email = "abhi.admin"
        const [userFound, setUserFound] = useState(false)
        const user = null;
        if(email.ensWith(".admin")){
            const docs = getDocs(adminCollectionRef);
            console.log(docs)
        }
    }
}

export default new LoginService()