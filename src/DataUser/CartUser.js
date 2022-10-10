import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Cart from './Cart'
import InforUserBuyProduct from '../module/inforUserBuyProduct'
import axios from 'axios'
import { updateCart } from '../features/cart/cartSlice'
import { updateList } from '../features/listPay/listPay'
import { FiX } from "react-icons/fi";
import style from './CartUser.module.scss'
import NotiProduct from '../module/notiProduct'
let ApiPayProductInCart = async (listPay, infor_user) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/pay/product_cart', {
        token,
        refreshtoken,
        product : listPay,
        infor : infor_user,
    })
    let dataResponse = await res.data
    return dataResponse
}

let CartPayed = (listCart, dataSuccess, listPay, dispatch) => {
    const array_check = [...listCart]
    for(var i = 0 ; i < listCart.length ; i++){
        let index = dataSuccess.indexOf(listCart[i].id_cart)
        if(index!== -1){
            array_check.splice(index, 1)
        }
    }
    dispatch(updateCart(array_check))
    dispatch(updateList([]))
}

function CartUser(){
    let {listCart} = useSelector((state) => state.cart)
    let { listPay }  = useSelector((state) => state.listpay)
    let dispatch = useDispatch()
    const [ inforUser, setInforUser ] = useState(false)
    const [ text , setText ] = useState('')
    const [ name, setName ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ payFail , setPayFail ] = useState([])
    const [ checkListPay , setCheckListPay ] = useState(false)
    return (
        <div className={style.cart_user} >
            {listCart.length === 0 ? <div className={style.status_cart} ><h2 className={style.title_status} >Chưa có sản phẩm nào trong giỏ hàng</h2></div>  :
                <div>
                    <h1 className={style.title} >Giỏ Hàng</h1>
                    <table className={style.cart} >
                        <tr className={style.cart_line} >
                            <th className={style.width_col} >Xác nhận</th>
                            <th className={style.width_col_product} >Sản phẩm</th>
                            <th className={style.width_col} >Giá</th>
                            <th className={style.width_col} >Số lượng</th>
                            <th className={style.width_col} >Thành tiền</th>
                            <th className={style.width_col} >Khác</th>
                        </tr>
                        
                        {listCart.map( cart =>
                            <Cart cart={cart} />
                        )}
                    </table>

    

                    <div className={style.nav_buy_product} >
                        <div className={style.quantity_product_pay} >Tổng số sản phẩm thanh toán {listPay.length}</div>
                        <button className={style.btn_buy_product} onClick={() => {
                            if(listPay.length === 0){
                                setText(process.env.REACT_APP_CHECK_LIST_PAY)
                                setCheckListPay(true)
                            }else{
                                setInforUser(true) 
                            }
                        }} >Mua hàng</button>
                    </div>

                    {checkListPay === false ? null : <NotiProduct text={text} setCheck={setCheckListPay} />}

                    {inforUser === false ? null : 
                        <div className={style.form_buy_product} > 

                        <div className={style.form} >
                                <div className={style.exit} > 
                                    <div className={style._exit} onClick={() => {
                                        setInforUser(false)
                                    }}>
                                        <FiX style={{fontSize : '20px' , margin : 'auto'}} />
                                    </div>
                                </div>

                                <InforUserBuyProduct features={{ setName, setPhone, setAddress }} /> 

                                <div className={style.btn_nav} >

                                    <button className={style.btn_function} onClick={() => {
                                        let infor_user = {
                                            "name_receive" : name,
                                            phone,
                                            "address_receive" : address
                                        }

                                        ApiPayProductInCart(listPay , infor_user).then(res => {
                                        CartPayed(listCart, res.dataResponse.success, listPay, dispatch)
                                        setPayFail(res.dataResponse.fail)
                                        setInforUser(false)
                                    })}} >Xác nhận mua hàng</button>

                                    <button className={style.btn_function} onClick={() => {
                                        setInforUser(false)
                                    }} >Đóng</button>

                                </div>
                            
                            </div>

                            
                        </div>
                    }

                {payFail.length === 0 ? null : 
                    <div>
                        {payFail.map(ele => <span>{ele.title}</span>)}
                        đã không còn đủ số lượng sản phẩm 
                    </div>}
            </div>
        }
        </div>
    )
}

export default CartUser