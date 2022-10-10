import axios from 'axios'
import { useState, useEffect } from 'react'
import Purchase from '../../module/Purchase'
import { CategoryStatus } from '../../module/StatusPurchase'
import { useDispatch , useSelector } from 'react-redux'
import { updatelistBillAdmin } from '../featearAdmin/updateBillSlice'
import style from './ManagerPurchase.module.scss'

let ApiGetBillAdmin = async (status) => {
    let res = await axios.post('http://localhost:3800/admin/manager/get_bill' , {
        status
    })
    let dataResponse = await res.data
    return dataResponse
}

let GetBillAdmin = (status, dispatch) => {
    ApiGetBillAdmin(status).then(res => {
        console.log(res)
        dispatch(updatelistBillAdmin(res.bill))
    })
}


function ManagerPurchase({socket}){
    const [ checkStatus , setCheckStatus ] = useState('')
    let { listBill } = useSelector((state) => state.adminBill)
    const dispatch = useDispatch()
    useEffect(() => {
        axios.post('http://localhost:3800/admin/manager/get_bill', {
            status : process.env.REACT_APP_STATUS_WAIT
        }).then( (res) => {
            dispatch(updatelistBillAdmin(res.data.bill))
            setCheckStatus(process.env.REACT_APP_STATUS_WAIT)
        })
    }, [dispatch, setCheckStatus])

    return (
        <div className={style.manager_purchase} >
            <div className={style.nav_purchase} >
                {CategoryStatus.map(ele => 
                    <div className={style.nav_purchase_sub} onClick={() => {
                        GetBillAdmin(ele.status, dispatch)
                        setCheckStatus(ele.status)
                    }} key={ele.id} style={ checkStatus === ele.status ?  {borderBottom : "1px solid orange"} : null} >
                        {ele.status}
                    </div>
                )}
            </div>
            {listBill.length === 0 ? <div className={style.status_bill} >
                <div className={style.title} >Chưa có đơn hàng</div>
                
                </div> : 
                <div className={style.list_bill_admin} >
                    {listBill.map(bill => 
                        <Purchase data={bill} socket={socket}/>
                    )}
                </div>
            }
            
        </div>
    )
}

export default ManagerPurchase