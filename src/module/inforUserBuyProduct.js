import { customCost } from '../features/other/other'
import style from './styleInforUserBuyProduct.module.scss'

function InforUserBuyProduct({features}){
    let { setName , setPhone, setAddress , Infor, option, getSize } = features

    return (
        <div className={style.form_buy_product} >

                <h2 className={style.title_form} >Thông tin thanh toán</h2>

                <div className={style.content_form} >
                    <div className={style.infor_user} >

                        <div className={style.title} >Thông tin người mua</div>

                        <div className={style.title_infor_user} >Tên người nhận hàng</div>
                        <input className={style.content} type={'text'} onChange={(e) => setName(e.target.value)} placeholder='Nhập tên' />

                        <div className={style.title_infor_user} >Số điện thoại</div>
                        <input className={style.content} type={'text'} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />

                        <div className={style.title_infor_user} >Địa chỉ</div>
                        <input className={style.content} type={'text'} onChange={(e) => setAddress(e.target.value)} placeholder="Nhập địa chỉ" />
                    </div>
                {Infor !== undefined ?
                    <div className={style.infor_product} >

                        <div className={style.title} >Thông tin đơn hàng</div>

                         <div className={style.infor_product_sub} >
                            <img width='20%' src={Infor.infor_product.pic} alt='picture_of_product' />

                            <div className={style.infor_product_sub_content} >
                                <div className={style.title_infor_product} >Tên sản phẩm : <span style={{color : '#26aa99'}} >{Infor.infor_product.title}</span> </div>
                                <div className={style.title_infor_product} >Kích thước : <span style={{color : '#26aa99'}} >{getSize}</span></div>
                                <div className={style.title_infor_product} >Số lượng : <span style={{color : '#26aa99'}} >{option}</span></div>
                                <div className={style.title_infor_product} >Thành tiền : <span style={{color : '#26aa99'}} >{customCost(Infor.infor_product.cost, Infor.infor_product.discount, option)}đ</span></div>
                            </div>
                        </div> 
                    </div>: null}
                </div>

            </div>
            
    )
}

export default InforUserBuyProduct