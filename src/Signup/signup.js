import  style  from './signup.module.scss'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { update } from '../features/update/updateUserSlice'
let getDataRequest = (classname) => {
    let infor = document.getElementsByClassName(classname)
    let dataRequest = {}
    for(var i = 0 ; i < infor.length ; i++){
        let value = infor[i].value
        dataRequest[infor[i].name] = value
    }
    console.log(dataRequest)
    return dataRequest
}

let ApiSignup = async (DataRequest) => {
    let res = await axios.post('http://localhost:3800/signup' , DataRequest)
    let dataResponse = await res.data
    return dataResponse
}

let takeDataResponse = (dataResponse, navigate, dispatch, setCheck) => {
    if(dataResponse.signup === 'fail'){
        setCheck(false)
    }else{
        let { username , id_user , avatar } = dataResponse.user.data
        localStorage.setItem('token', dataResponse.user.token)
        localStorage.setItem('refreshToken' , dataResponse.user.refreshToken)
        localStorage.setItem('id_user' , id_user)
        localStorage.setItem('infor_user', JSON.stringify({username, avatar}))
        dispatch(update({username, avatar}))
        navigate('/' , {replace : true})
    }
}

function Signup() {
    const [check, setCheck] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div>
            <div className={style.form_signup}>
                <h1 className={style.title_signup} >Đăng kí</h1>
                <div className={style.title} >Tên đăng nhập</div>
                <input name="username" className={style.content} type={'text'} placeholder="Tên đăng nhập"/>

                <div className={style.title} >Email</div>
                <input name="account" className={style.content} type={'text'} placeholder="Bạn nhập đúng định dạng email nha"/>

                <div className={style.title} >Mật khẩu</div>
                <input name="pass" className={style.content} type={'password'} placeholder="Này thì đặt sao cho dễ nhớ thôi"/>

                <div className={style.title} >Tên thiệt</div>
                <input name="name" className={style.content} type={'text'} placeholder="Tên thiệt"/>

                <div className={style.title} >Ngày sinh</div>
                <input name="date_of_birth" className={style.content} type={'date'} placeholder="điền giống vầy nè nha yy/mm/dd"/>

                <div className={style.title} >Số điện thoại</div>
                <input name="phone" className={style.content} type={'text'} placeholder="Ghi đúng số nha"/>

                <div className={style.title} >Địa chỉ</div>
                <input name="address" className={style.content} type={'text'} placeholder="Ghi địa chỉ"/>

                <div className={style.btn_signup}>
                    <button className={style.btn_signup_sub} onClick={() => {
                        let DataRequest = getDataRequest(style.content)
                        ApiSignup(DataRequest).then(dataResponse => {
                        takeDataResponse(dataResponse, navigate, dispatch, setCheck)
                        }) 
                    }}>ĐĂNG KÝ</button>
                </div>
                


            </div>

            {check === false ? <div>
                <div>
                    Đăng kí không thành công rùi, xem lại các thông tin đã nhập đặc biệt ở phần Email nhá
                </div>
                <button onClick={() => {setCheck(true)}} >ok</button>
            </div> : null }
            
        </div>
    )
}

export default Signup