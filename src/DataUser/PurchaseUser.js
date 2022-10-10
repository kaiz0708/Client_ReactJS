import { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { CategoryStatus } from '../module/StatusPurchase'
import { updateBill } from '../features/purchase/purchaseSlice'
import Purchase from '../module/Purchase'
import style from './PurchaseUser.module.scss'
import axios from 'axios'

let ApiGetStatus = async (status) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/pay/bill_user', {
        token, refreshtoken, 
        status
    })
    let dataResponse = await res.data
    return dataResponse
}

let ApiGetAllBill = async () => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/pay/bill_user_all', {
        token, refreshtoken, 
    })
    let dataResponse = await res.data
    return dataResponse
}

let getStatus = (status, dispatch) => {
    ApiGetStatus(status).then(data => {
        if(data.refreshtoken === false){
            dispatch(updateBill(data.bill))
        }else{
            localStorage.setItem('token', data.new_token)
            getStatus(status, dispatch)
        }
    })
}

let getAllBill = (dispatch) => {
    ApiGetAllBill().then(data => {
        if(data.refreshtoken===false){
            dispatch(updateBill(data.bill))
        }else{
            localStorage.setItem('token', data.new_token)
            getAllBill(dispatch)
        }
    })
}


function PurchaseUser({socket}){
    
    let { listBill } = useSelector((state) => state.purchase)
    const [ checkAll , setCheckAll ] = useState(true)
    const [ checkStatus , setCheckStatus ] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        getAllBill(dispatch)
    }, [dispatch])
    return (
        <div className={style.purchase} >

            <h1>Trạng thái đơn hàng</h1>
            
            <div className={style.nav_purchase} >
                <div className={style.nav_purchase_sub} onClick={() => {
                    getAllBill(dispatch)
                    setCheckAll(true)
                    setCheckStatus(false)
                    }} style={checkAll ? {borderBottom : "2px solid orange"} : null} >
                Tất Cả</div>

                {CategoryStatus.map(ele => 
                    <div className={style.nav_purchase_sub} onClick={() => {
                        getStatus(ele.status, dispatch)
                        if(checkAll){
                            setCheckAll(false)
                        }
                        setCheckStatus(ele.status)
                    }} style={checkStatus === ele.status ? {borderBottom : "2px solid orange"} : null} key={ele.id} >
                    {ele.status}
                    </div>
                )}
            </div>
            

            {listBill.length === 0 ? <div className={style.status_bill} >

                <h2 className={style.title} >Chưa có đơn hàng</h2>
                
                </div> : 
            <div className={style.list_bill} >
                {listBill.map(bill => 
                    <Purchase data={bill} socket={socket} />
                )}
            </div>}
        </div>
    )
}

export default PurchaseUser

