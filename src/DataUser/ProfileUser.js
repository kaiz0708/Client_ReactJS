import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { updateAvatar } from '../features/update/updateUserSlice'
import { Link } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import style from './ProfileUser.module.scss'

let getDataRequest = async (classname) => {
    let formUpdate = document.getElementsByClassName(classname)
    let dataRequest = {}
    for(let i = 0 ; i < formUpdate.length ; i++ ){
        let value = formUpdate[i].value
        dataRequest[formUpdate[i].name] = value
    }
    console.log(dataRequest)
    return dataRequest
}


let ApiUpdateUser = async (dataRequest) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    const data = {
        token,
        refreshtoken,
        'data' : dataRequest,
    }
    let res = await axios.post('http://localhost:3800/update_user', data)
    let dataResponse = await res.data
    return dataResponse
}

let ApiGetUser = async () => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/user', {
        token, refreshtoken
    })
    let dataResponse = await res.data
    return dataResponse
}

let ApiUpdateAvatar = async (file) => {
    let dataform = new FormData()
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    dataform.append('img' , file)
    let res = await axios.post('http://localhost:3800/update_avatar', dataform, 
    {
        headers:{ 
            "Content-Type": "multipart/form-data",
            "token" : token,
            "refreshtoken" : refreshtoken
        }
    })
    let dataResponse = await res.data
    return dataResponse
}

let updateAvata = (dispatch, file) => {
    ApiUpdateAvatar(file).then(res => {
        if(res.refreshtoken === false){
            dispatch(updateAvatar(res.avatar_update))
        }else{
            if(res.new_token !== undefined){
                localStorage.setItem('token', res.new_token)
                updateAvatar(dispatch,file)
            }
        }
    })
}

let getInforUser = (setProfile, setFile) => {
    ApiGetUser().then(res => {
        if(res.refreshtoken===false){
            setProfile(res.infor_user)
            setFile(res.infor_user.pic)
        }else{
            localStorage.setItem('token' , res.new_token)
            getInforUser(setProfile, setFile)
        }
    })
}

let updateUser = (dataRequest, setResults, setProfile, file) => {
    ApiUpdateUser(dataRequest, file).then(res => {
        if(res.refreshtoken===false){
            setProfile(res.user_update)
            setResults(res.update)
        }else{
            localStorage.setItem('token' , res.new_token)
            updateUser(dataRequest, setResults, setProfile)
        }
    })
}

function ProfileUser() {
    let { avatar } = useSelector((state) => state.update)
    const [profile, setProfile] = useState({
        pic : '',
        name : '',
        username : '',
        date_of_birth : '',
        address : '',
        phone : ''
    })
    const [resultsUpdate, setResults] = useState(false)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    console.log(avatar)
    useEffect(() => {
        getInforUser(setProfile, setFile)
    }, [setProfile, setFile])

    return (
        <div className={style.profile} >

            <h1>Hồ sơ của tôi</h1>

            <div className={style.content_profile} >

                <div className={style.infor_user} >

                    <div className={style.title} >Tên đăng nhập</div>
                    <input name='username' className={style.content} defaultValue={profile.username} type={'text'} placeholder='Chưa có thông tin' />

                    <div className={style.title} >Tên thiệt</div>
                    <input name="name" className={style.content} defaultValue={profile.name} type={'text'} placeholder='Chưa có thông tin' />

                    <div className={style.title} >Ngày sinh</div>
                    <input name='date_of_birth' className={style.content} defaultValue={profile.date_of_birth} type={'date'} placeholder='Chưa có thông tin' />

                    <div className={style.title} >Số điện thoại</div>
                    <input name="phone" className={style.content} defaultValue={profile.phone} type={'text'} placeholder='Chưa có thông tin' />

                    <div className={style.title} >Địa chỉ</div>
                    <input name="address" className={style.content} defaultValue={profile.address} type={'text'} placeholder='Chưa có thông tin' />

                    <div className={style.btn_update} >
                        <button className={style.btn_update_sub} onClick={ async () => {
                            let data = await getDataRequest(style.content, file)
                            updateUser(data, setResults, setProfile, file)
                        }}>Lưu</button>
                    </div>
                    
                </div>

                <div className={style.line} ></div>

                <div className={style.avatar} >
                    <div className={style.picture_avatar} >
                         {avatar === ' ' ? <BiUser style={{fontSize : '200px'}} /> : <img style={{borderRadius : "50%"}} width={200} height={200} alt='21' src={avatar} /> }
                    </div>
                   <div className={style.btn_update} >
                        <input type={'file'} onChange={(e) => {
                            setFile(e.target.files[0])
                        }} />
                        <button className={style.btn_update_sub} onClick={() => {
                            if(file!==null){
                                updateAvata(dispatch, file)
                            }
                        }}>Lưu Ảnh</button>
                   </div>

                    <div className={style.other}>
                        <Link className={style.profile_text_dicoration} to='/user/account/cart'>Xem giỏ hàng</Link>
                        <Link className={style.profile_text_dicoration} to='/user/account/purchase'>Đơn mua</Link>
                    </div>   
                </div>

            </div>
                

            <div>
                {resultsUpdate===true ? <div>Cập nhật oke rồi á</div> : null}
            </div>
        </div>
    )
}

export default ProfileUser