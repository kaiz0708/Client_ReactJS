import {customCost} from '../features/other/other'
import style from './styleDetailPay.module.scss'
import { FiX } from "react-icons/fi";
function Detailpay({detail , check}){
    const { user, product , checkstatus, size, quantity, date, time } = detail
    return (
        <div className={style.detail_pay} >

            <div className={style.form} >

                <div className={style.exit} >
                    <div onClick={() => {
                        check(false)
                    }} className={style.btn_exit} >
                        <FiX style={{fontSize : '20px' , margin : 'auto'}} />
                    </div>
                </div>

                <div className={style.infor_user} >
                    <div className={style.title} >Thông tin người nhận hàng</div>
                    <div className={style.infor_sub} >Tên người nhận hàng : {user.name_receive}</div>
                    <div className={style.infor_sub} >Số điện thoại : {user.phone}</div>
                    <div className={style.infor_sub} >Địa chỉ nhận hàng : {user.address_receive}</div>
                </div>
            
                <div className={style.infor_bill} >
                    <div className={style.title} >Thông tin đơn hàng</div>

                    <div className={style.infor_bill_nav} >
                        <div className={style.picture_product} >
                            <img width={100} height={150} src={product.pic} alt="product"/>
                        </div>

                        <div className={style.infor_bill_sub} >
                            <div className={style.infor_sub} >Tên sản phẩm : <span style={{color : 'black'}} >{product.title}</span></div>
                            <div className={style.infor_sub} >Sản phẩm đang giảm giá : {product.discount}%</div>
                            <div className={style.infor_sub} >Gía sản phẩm : {customCost(product.cost, product.discount, quantity)}đ</div>
                            <div className={style.infor_sub} >Gía gốc : {product.cost}đ</div>
                            <div className={style.infor_sub} >Đã mua lúc : <span>{date} </span> <span>lúc {time}</span> </div>
                            <div className={style.infor_sub} >Kích thước : {size}</div>
                            <div className={style.infor_sub} >Số lượng : {quantity}</div>
                            <div className={style.infor_sub} >Trạng thái : {checkstatus.title}</div>
                        </div>
                    </div>
                    

                </div>

                <div className={style.exit_tag} >
                    <button className={style.btn_exit} onClick={() => 
                        check(false)
                    }>Đóng</button>
                </div>
                
            </div>
        </div>
    )
}

export default Detailpay