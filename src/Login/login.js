import { useState  } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { update } from '../features/update/updateUserSlice'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import authenticate from '../Firebase/Firebase'
import  style  from './login.module.scss'
import { updateAdmin } from '../features/checkAuth/checkAdmin'
import { updateCart } from '../features/cart/cartSlice'
import { FiFacebook } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
let getDataRequest = (classname) => {
    let infor = document.getElementsByClassName(classname)
    let dataRequest = {}
    for(var i = 0 ; i < infor.length ; i++){
        let value = infor[i].value
        dataRequest[infor[i].name] = value
    }
    return dataRequest
}

let  ApiLogin = async (DataRequest) => {
    let res = await axios.post('http://localhost:3800/login' , DataRequest)
    let dataResponse = await res.data
    return dataResponse
}

let takeDataResponse = (dataResponse, navigate, dispatch, setCheck) => {
    if(dataResponse.login === 'fail'){
        setCheck(false)
    }else{
        if(dataResponse.authorization === 'user'){
            let { username, avatar } = dataResponse.user.data
            localStorage.setItem('token', dataResponse.user.token)
            localStorage.setItem('refreshToken', dataResponse.user.refreshToken)
            localStorage.setItem('infor_user', JSON.stringify({username, avatar}))
            dispatch(update({username, avatar}))
            dispatch(updateCart(dataResponse.cart))
            navigate('/',{replace : true})
        }else{
            dispatch(updateAdmin(true))
            navigate('/', {replace : true})
        }
    }
}


function Login(){
    const [check, setCheck] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className={style.login} >
            <div className={style.form_login} >
                <h1 className={style.title_login} >Đăng nhập</h1>

                <div className={style.title} >Email</div>
                <input className={style.content} name='account' type={"text"} placeholder="Email"/>

                <div className={style.title} >Mật khẩu</div>
                <input className={style.content} name='pass' type={"password"} placeholder="Không nhớ thì nhấn vào lấy lại mật khẩu bên dưới nha"/>
                <div className={style.redirect} ><Link style={{textDecoration : 'none' , color : '#8A8A8F'}} to='/signup' >Đăng kí</Link></div>
                <div className={style.btn_login} >
                    <button className={style.btn_login_sub} onClick={() => {
                        let DataRequest = getDataRequest(style.content)
                        ApiLogin(DataRequest).then( dataResponse => {
                            takeDataResponse(dataResponse, navigate, dispatch, setCheck)
                        })
                    }}>Đăng nhập</button>
                   
                </div>
                

                <div style={{textAlign : 'center'}} >hoặc đăng nhập với</div>

                <div className={style.btn_login} >
                    <button className={style.btn_login_facebook} onClick={() => { authenticate.signInWithFacebook(navigate, dispatch)}}><FiFacebook/>Facebook</button>

                    <button className={style.btn_login_google} onClick={() => { authenticate.signInWithGoogle(navigate, dispatch)}} ><FcGoogle/>Google</button>
                </div>
                
            </div>

            {check === false ? <div>
                <div>
                    Đăng nhập không thành công rùi, xem lại cái email hoặc mật khẩu nhá
                </div>
                <button onClick={() => {setCheck(true)}} >ok</button>
            </div> : null }

        </div>
    )
}

export default Login