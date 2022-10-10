import axios from 'axios'
import { useEffect, useState , useRef } from 'react'
import { BiUser } from 'react-icons/bi'
import { CategoryStatus } from '../../module/StatusPurchase'
import  Purchase  from '../../module/Purchase'
import { useSelector , useDispatch } from 'react-redux'
import { updatelistBillAdmin } from '../featearAdmin/updateBillSlice'
import style from './ManagerInforUser.module.scss'

let ApiGetStatus = async (id_user, status) => {
    let res = await axios.post('http://localhost:3800/admin/manager/get_bill/id_user',{
        id_user,
        status
    })
    let dataResponse = await res.data
    return dataResponse
}

let GetStatus = (id_user, status, dispatch) => {
    ApiGetStatus(id_user, status, dispatch).then(res => {
        dispatch(updatelistBillAdmin(res.bill))
    })
}



function ManagerInforUser({data, exit, name}){
    let { listBill } = useSelector((state) => state.adminBill)
    const [ checkStatus , setCheckStatus ] = useState(CategoryStatus[0].status)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updatelistBillAdmin([]))
        
    }, [dispatch])
    return(
        <div className={style.form} >
                <h2 className={style.title} >Thông tin người dùng</h2>
                <div className={style.user} >
                    
                    <div className={style.avatar} >
                        {data.infor_user.pic === ' ' ? <BiUser style={{fontSize : "200px"}} /> :  <img width={200} height={200} src={data.infor_user.pic} alt='pic' />}
                        <div>Ảnh đại diện</div>
                    </div>
                    
                    <div className={style.infor_user} >
                        <div className={style.title_sub} ><b>ID :</b> {data.id_user}</div>
                        <div className={style.title_sub} ><b>Tài khoản : </b> {data.infor_account.account}</div>
                        <div className={style.title_sub} ><b>Mật khẩu : </b>{data.infor_account.pass}</div>
                        <div className={style.title_sub} ><b>Tên đăng nhập : </b>{data.infor_user.username}</div>
                        <div className={style.title_sub} ><b>Tên : </b>{data.infor_user.name}</div>
                        <div className={style.title_sub} ><b>Ngày sinh : </b>{data.infor_user.date_of_birth}</div>
                        <div className={style.title_sub} ><b>Số điện thoại : </b>{data.infor_user.phone}</div>
                        <div className={style.title_sub} ><b>Địa chỉ : </b>{data.infor_user.address}</div>
                        </div>
                    </div>
                <h2 className={style.title} >Thông tin đơn hàng</h2>

                <div className={style.bill} >

                    <div className={style.nav_purchase} >
                        {CategoryStatus.map(ele => 
                            <div className={style.nav_purchase_sub} onClick={() => {
                                GetStatus(data.id_user, ele.status, dispatch)
                                setCheckStatus(ele.status)
                            }} key={ele.id} style={ checkStatus === ele.status ? {borderBottom : "2px solid orange"} : null} >
                                {ele.status}
                            </div>
                        )}
                    </div>
                
                    {listBill.length === 0 ? <div style={{textAlign :'center', padding :'10px 0px'}}>Hiện chưa có đơn hàng nào ở trạng thái này</div> : <div> {listBill.map(bill => <Purchase data={bill}/>)}</div>}
                    
                </div>

            <div className={style.btn_nav} >
                <button className={style.btn_nav_sub} onClick={() => {
                    exit(false)
                }}>Đóng</button>
            </div>
            
        </div>
    )
}

export default ManagerInforUser