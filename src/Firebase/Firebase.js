import { initializeApp } from "firebase/app"
import {getAuth , GoogleAuthProvider , signInWithPopup , FacebookAuthProvider} from 'firebase/auth'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { update } from "../features/update/updateUserSlice"
import { updateCart } from "../features/cart/cartSlice"
const firebaseConfig = {
  apiKey: "AIzaSyCVfkAm25zVfaeNpGC4h15ouFMMCs2BYlI",
  authDomain: "myapp-341506.firebaseapp.com",
  projectId: "myapp-341506",
  storageBucket: "myapp-341506.appspot.com",
  messagingSenderId: "868097721115",
  appId: "1:868097721115:web:f77b0afdc52766639649be",
  measurementId: "G-Y5BSSL0JRJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


const Google = new GoogleAuthProvider()

const Facebook = new FacebookAuthProvider();

let CreateDataRequest = (data) => {
    const {name , picture , user_id} = data
    return {
        "username" : name,
        "user_id" : user_id
    }
}

let ApiService = async (DataReq, dispatch) => {
    let res = await axios.post('http://localhost:3800/loginService' , DataReq)
    let dataResponse = await res.data
    let { username , avatar , id_user } = dataResponse.user.data
    localStorage.setItem("token" , dataResponse.user.token)
    localStorage.setItem("refreshToken" , dataResponse.user.refreshToken)
    localStorage.setItem('id_user' , id_user)
    dispatch(update({
        "username" : username,
        "avatar" : avatar
    }))
    dispatch(updateCart(dataResponse.cart))
}

let signInWithGoogle = (navigate, dispatch) => {
    signInWithPopup(auth , Google).then((res) => {
        const DataReq = CreateDataRequest(jwt_decode(res._tokenResponse.idToken))
        ApiService(DataReq, dispatch).then()
        navigate('/' , {replace : true})
    })
}

let signInWithFacebook = (navigate, dispatch) => {
    signInWithPopup(auth, Facebook).then(res => {
        const DataReq = CreateDataRequest(jwt_decode(res._tokenResponse.idToken))
        ApiService(DataReq, dispatch).then()
        navigate('/' , {replace : true})
    })
}

const authenticate = {
    signInWithFacebook,
    signInWithGoogle
}

export default authenticate




