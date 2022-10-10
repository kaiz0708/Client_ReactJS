import { customCost , customTitle , createDataRequest } from '../features/other/other'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { updateCart } from '../features/cart/cartSlice'
import { useDispatch , useSelector } from 'react-redux'
import { addProductList , removeProductList } from '../features/listPay/listPay'
import { FaChevronRight , FaChevronLeft  } from "react-icons/fa";
import axios from 'axios'
import style from './Cart.module.scss'

let ApiDeleteCart = async (id_cart) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshtoken')
    let res = await axios.post('http://localhost:3800/delete/cart', {
        token, refreshtoken, id_cart
    })

    let dataResponse = await res.data
    return dataResponse
}

let takeDataResponse = (dataResponse, listCart, dispatch) => {
    let new_array = listCart.filter((cart) => cart.id_cart !== dataResponse.id_cart)
    dispatch(updateCart(new_array))
}
 
let getData = (check, data, dispatch) => {
    check === true ? dispatch(removeProductList(data)) : dispatch(addProductList(data))
}

function Cart ({cart}) {
    let { listCart } = useSelector((state) => state.cart)
    let dispatch = useDispatch()
    const [option, setOption] = useState(cart.quantity)
    const [check , setCheck] = useState(false)
    const [cost , setCost] = useState(customCost(cart.infor_product.cost, cart.infor_product.discount, option))
    return (
        <tr className={style.cart_sub} >

            <td className={style.content} >
                <input className={style.accept} onChange={() => {
                    let data = createDataRequest(cart, option)
                    getData(check, data, dispatch)
                    setCheck(!check)
                }} type={'checkbox'} />
            </td>
            

            <td className={style.content} >
                <div className={style.infor_basic} >
                    <img width={100} height={150} src={cart.infor_product.pic} alt='picture_of' />
                    <div className={style.content_basic} >
                        <div className={style.title} >
                            <Link className={style.cart_text_decoration} to={`/product/${customTitle(cart.infor_product.title)}/${cart.id_product}`} >
                                {cart.infor_product.title}
                            </Link>
                        </div>
                        <span className={style.Size} >Kích cỡ : {cart.size} </span>
                    </div>
                </div>
            </td>

            <td className={style.content} >
                {customCost(cart.infor_product.cost, cart.infor_product.discount,1)}đ
            </td>

            <td className={style.content} >
                <div className={style.quantity} >
                    <div className={style.quantity_sub} >
                        <button className={style.btn_option} style={option === 1 ? {color : 'gray'} : {color : 'black'}} onClick={() => {
                            if(option > 1){
                                setOption(option - 1)
                                setCost(customCost(cart.infor_product.cost, cart.infor_product.discount, option - 1))
                            }
                        }}><FaChevronLeft style={{fontSize : "14px"}} /></button>

                        <span className={style.quantity_option}>{option}</span>

                        <button className={style.btn_option} onClick={() => {
                            setOption(option + 1)
                            setCost(customCost(cart.infor_product.cost, cart.infor_product.discount, option + 1))
                        }}><FaChevronRight style={{fontSize : "14px"}} /></button>

                    </div>
                </div>
            </td>

            <td className={style.content} >
                {cost}đ
            </td>
            
            <td className={style.content} >
                <button className={style.delete_cart}  onClick={() => {
                    ApiDeleteCart(cart.id_cart).then(res => {
                        takeDataResponse(res, listCart, dispatch)
                    })
                }} >Xóa khỏi giỏ</button>
            </td>
            
        </tr>
    )
}

export default Cart