import axios from "axios"
import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ManagerInforUser from "../ManagerInforUser/ManagerInforUser"
import { removeUserList , updateUserList  } from '../featearAdmin/updateUserSlice'
import style from './ManagerUser.module.scss'
let ApiGetAllUser = async () => {
    let res = await axios.get('http://localhost:3800/admin/manager/user')
    let user = await res.data
    return user
}

let ApiDeleteUser = async (id_user) => {
    let res = await axios.get('http://localhost:3800/admin/manager/delete/user', {
        params : {
            "id_user" : id_user
        }
    })
    let data = await res.data
    return data
}

let DeleteUserAdmin = (id_user, dispatch) => {
    ApiDeleteUser(id_user).then( res => {
        dispatch(removeUserList(id_user))
    })
}

let GetUser = (dispatch) => {
    ApiGetAllUser().then( res => {
        dispatch(updateUserList(res.user))
    })
}


function ManagerUser(){
    let { listUser } = useSelector((state) => state.adminUser)
    const [ checkDelete , setCheckDelete ] = useState(false)
    const [ checkDetail , setcheckDetail ] = useState(false)
    const [ Detail , setDetail ] = useState('')
    
    const dispatch = useDispatch()
    useEffect(() => {
        GetUser(dispatch)
    }, [dispatch])

    return (
        <div className={style.form_manager_user} >
            <h2>Quản lí người dùng</h2>

            <table className={style.list_user} >
                <tr>
                    <th className={style.width_col} >Tài khoản</th>
                    <th className={style.width_col} >Mật khẩu</th>
                    <th className={style.width_col} >Tên đăng nhập</th>
                    <th className={style.width_col} >ID</th>
                    <th className={style.width_col} >Tùy chọn khác</th>
                </tr>
                {listUser.map(ele => 
                    <tr>
                        <td className={style.width_col_sub} >{ele.infor_account.account}</td>
                        <td className={style.width_col_sub} >{ele.infor_account.pass}</td>
                        <td className={style.width_col_sub} >{ele.infor_user.username}</td>
                        <td className={style.width_col_sub} >{ele.id_user}</td>
                        <td className={style.width_col_sub} >
                            <button onClick={() => {
                                DeleteUserAdmin(ele.id_user)
                            }} >Xóa</button>
                            <button onClick={() => {
                                setDetail(ele)
                                setcheckDetail(true)
                            }}
                            >Xem chi tiết</button>
                        </td>
                    </tr>
                )}
            </table>

            {checkDetail === true ? <div className={style.form_infor}>
                <ManagerInforUser data={Detail} exit={setcheckDetail} name={style.form_infor}/>
            </div>  : null}

            {checkDelete === true ? <div>
                <div>Xóa người dùng thành công</div>
                <button onClick={() => {
                    setCheckDelete(false)
                }} >Đóng</button>
            </div>  : null}
        </div>
    )
}

export default ManagerUser