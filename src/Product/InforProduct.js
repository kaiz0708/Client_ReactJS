import { updateInforProduct } from '../features/product/displayProduct'
import { useSelector, useDispatch } from 'react-redux'
import { useParams , useNavigate } from 'react-router-dom'
import { useEffect , useState  } from 'react'
import axios from 'axios'
import { customCost } from '../features/other/other'
import { addCart } from '../features/cart/cartSlice'
import { updateListFeedBack , addFeedBack } from '../features/feedback/feedback'
import InforUserBuyProduct from '../module/inforUserBuyProduct'
import FormUpdateProduct from '../module/FormUpdateProduct'
import FeedBack from '../module/FeedBack'
import { FaChevronRight , FaChevronLeft  } from "react-icons/fa";
import NotiProduct from '../module/notiProduct'
import { FiX } from "react-icons/fi";
import style from './InforProduct.module.scss'

let ApiAddCart = async (cart) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/add/cart', {
        token,
        refreshtoken,
        cart
    })
    let dataResponse = await res.data
    return dataResponse
}

let ApiBuyProduct = async (infor_user, product) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/pay/product' , {
        token,
        refreshtoken,
        infor_user,
        product
    })
    let dataResponse = await res.data
    return dataResponse
}

let ApiAddFeedBack = async (username, avatar, content, id_feed) => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await axios.post('http://localhost:3800/add/feedback' , {
        token,
        refreshtoken,
        username,
        avatar,
        content, 
        id_feed
    })
    let dataResponse = await res.data
    return dataResponse
}


let AddFeedBack = (username, avatar, content, id_feed, dispatch) => {
    ApiAddFeedBack(username, avatar, content, id_feed).then(res => {
        dispatch(addFeedBack(res.new_feed))
    })
}

let payProduct = (infor_user, product,setCheck, setText, navigate, setCheckBuyProduct) => {
    if(localStorage.getItem('token') !== null){
        ApiBuyProduct(infor_user, product).then(dataResponse => {
            if(dataResponse.refreshtoken === false){
                if(dataResponse.buy_product){
                    setText(process.env.REACT_APP_BUY_PRODUCT_SUCCESS)
                    setCheck(true)
                    setCheckBuyProduct(false)
                }else{
                    setText(process.env.REACT_APP_BUY_PRODUCT_FAIL)
                    setCheck(true)
                    setCheckBuyProduct(false)
                }
            }else{
                if(dataResponse.new_token !== undefined){
                    localStorage.setItem('token' , dataResponse.new_token)
                    payProduct(infor_user, product, setCheck, setText)
                }else{
                    alert('Bạn cần đăng nhập lại do phiên đã hết hạn')
                    localStorage.removeItem('token')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('id_user')
                    navigate('/login' , {replace : true})
                }
               
            }
        })
    }else{
        setText(process.env.REACT_APP_CHECK_AUTH)
        setCheck(true)
    }
}

// Thêm sản phẩm vào giỏ hàng //

let addCartClient = (dataResponse, CartAtClient, dispatch) => {
    dispatch(addCart({
        id_cart : dataResponse.id_cart,
        ...CartAtClient
    }))

}

let addCartUser = (id_product, getSize , option, InforProduct, dispatch, setCheck, setText, navigate) => {
    if(localStorage.getItem('token') !== null){
        const cart = {
            id_product,
            "size" : getSize,
            "quantity" : option
        }
    
        const CartAtClient = {
            "infor_product" : {...InforProduct},
            "id_product" : id_product,
            "quantity" : option,
            "size" : getSize
        }
    
        ApiAddCart(cart).then(dataResponse => {
            if(dataResponse.refreshtoken === false){
                addCartClient(dataResponse, CartAtClient, dispatch)
                setText(process.env.REACT_APP_ADD_CART)
                setCheck(true)
            }else{
                if(dataResponse.new_token !== undefined){
                    localStorage.setItem('token' , dataResponse.new_token)
                    addCartUser(id_product, getSize , option, InforProduct, dispatch, setCheck, setText)
                }else{
                    alert('Bạn cần đăng nhập lại do phiên đã hết hạn')
                    localStorage.removeItem('token')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('id_user')
                    navigate('/login' , {replace : true})
                } 
            }
        })
    }else{
        setText(process.env.REACT_APP_CHECK_AUTH)
        setCheck(true)
    }
}

// Thêm một sản phẩm vào giỏ hàng // 


function InforProduct({socket}){
    let { username, avatar } = useSelector((state => state.update))
    let { Infor } = useSelector((state) => state.InforProduct)
    let { listFeedBack } = useSelector((state) => state.feedback)
    const navigate = useNavigate()
    const { checkAdmin } = useSelector((state) => state.admin)
    const { id_product } = useParams()
    const [ option , setOption ] = useState(1)
    const [ getSize , setGetSize ] = useState(false)
    const [ check , setCheck ] = useState(false)
    const [ text , setText ] = useState('')
    const [ checkBuyProduct , setCheckBuyProduct ] = useState(false)
    const [ updateProduct , setUpdateProduct ] = useState(false)
    const [name_receive, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address_receive, setAddress] = useState('')
    const [state , setState] = useState('')
    const [ showFeedBack, setShowFeedBack ] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get('http://localhost:3800/product_id', {
            params : {
                "id_product" : id_product
            }
        }).then(res => {
            console.log(res.data)
            dispatch(updateInforProduct(res.data))
            dispatch(updateListFeedBack(res.data.feedback_user.list_feedback))
        })
    }, [id_product, dispatch])
    return (
        <div className={style.infor_product}>

            <h1>Thông tin sản phẩm</h1>

            {Object.keys(Infor).length !== 0 ?

            <div className={style.content_infor_product} >
                <div className={style.picture_product} >
                    <img width={500} height={700} src={Infor.infor_product.pic} alt='picture_of_product'/>
                </div>
                    
                <div className={style.content_product} >
                    <div className={style.infor_basic} >
                        <div className={style.title} >Thông tin cơ bản</div>
                        <div className={style.name} >Tên sản phẩm :{Infor.infor_product.title}</div>
                        <div className={style.brand} >Thương hiệu : {Infor.infor_product.brand}</div>
                        <div className={style.cost} >Giá : {customCost(Infor.infor_product.cost, Infor.infor_product.discount, option)}đ</div>
                        <div className={style.discount} >Mặt hàng đang giảm giá : {Infor.infor_product.discount}%</div>
                    </div>

                    <div className={style.size} >
                        <div className={style.title} >Kích thước</div>
                            <div className={style.listSize} >{Infor.size.map(size => 
                                size.quantity === 0 ? <div className={style.size_sub} style={{opacity : "0.5"}} >{size.size_name}</div> : <div className={style.size_sub} style={getSize === size.size_name ? {backgroundColor : "black", color : 'white' , border :'1px solid black'} : null} onClick={() => setGetSize(size.size_name)} >{size.size_name}</div>
                            )}</div>
                    </div>
                    
                    
                    <div className={style.color} >
                        <div className={style.title} >Màu sắc</div>
                        <div className={style.color_product} style={{backgroundColor : Infor.pic_color}} ></div>
                    </div>

                    <div className={style.quantity} >
                        <div className={style.title} >Số lượng</div>
                        <div className={style.choose_quantity} >
                            <button className={style.btn_quantity} onClick={() => {
                                if(option > 1){
                                    setOption(option - 1)
                                }
                            }} ><FaChevronLeft style={{fontSize : '14px'}} /></button>
                            <div className={style.option_quantity} >{option}</div>
                            <button className={style.btn_quantity} onClick={() => {
                                setOption(option+1)
                            }}><FaChevronRight style={{fontSize : '14px'}} /></button>
                        </div>
                    </div>
                <div className={style.describe} >
                    <div className={style.title} >Mô tả sản phẩm</div>
                    <div className={style.describe_sub} ><b>{Infor.material.title} : </b> <span>{Infor.material.content}</span></div>
                    <div className={style.describe_sub} ><b>{Infor.form.title} : </b> <span>{Infor.form.content}</span></div>
                    <div className={style.describe_sub} ><b>{Infor.fit.title} : </b> <span>{Infor.fit.content}</span> </div>
                </div>

                {checkAdmin === false ? 
                <div className={style.user_function} >

                    <div className={style.addcart} >
                        <button className={style.btn_addcart} onClick={() => {

                            if(getSize === false){
                                setText(process.env.REACT_APP_CHECK_SIZE)
                                setCheck(true)
                            }else{
                                addCartUser(id_product, getSize, option, Infor.infor_product, dispatch, setCheck, setText, navigate)
                            }

                        }}>Thêm vào giỏ hàng</button>
                    </div>

                    <div className={style.buy_product} >
                        <button className={style.btn_buy_product} onClick={() => {
                            if(getSize === false){
                                setText(process.env.REACT_APP_CHECK_SIZE)
                                setCheck(true)
                            }else{
                                setCheckBuyProduct(true)
                            }
                        }}><span>Mua Hàng</span></button>

                        <button className={style.btn_show_feedback} onClick={() => {
                            setShowFeedBack(true)
                        }} >Xem đánh giá sản phẩm</button>
                    </div>

                    </div> : 

                    <div className={style.update_product_admin} >
                        <button className={style.btn_update_product_admin} onClick={() => {
                            setUpdateProduct(true)
                        }} >Cập nhật sản phẩm</button>
                    </div>
                }
            </div>




                {updateProduct === true ? <FormUpdateProduct data={Infor} id_product={id_product} setUpdateProduct={setUpdateProduct} /> : null}

                {checkBuyProduct ?
                <div className={style.form_buy_product_parent} >
                    <div className={style.form_buy_product_sub} >
                        <div onClick={() => {
                            setCheckBuyProduct(false) 
                        }} className={style.exit} >
                            <div className={style.btn_exit} ><FiX style={{fontSize : '20px' ,  margin : 'auto'}} /></div>
                        </div>
                    
                        <InforUserBuyProduct features={{setName, setPhone, setAddress, Infor, option, getSize}}/>

                        <div className={style.btn_nav} >
                            <button className={style.btn_nav_sub} onClick={() => {
                                const infor_user = {
                                    name_receive,
                                    phone,
                                    address_receive
                                }
                                 const product = {
                                    id_product : id_product,
                                    quantity : option,
                                    size : getSize
                                }
                                payProduct(infor_user, product, setCheck, setText, navigate, setCheckBuyProduct)
                            }} >Xác Nhận Mua Hàng</button>
                            <button className={style.btn_nav_sub} onClick={() => {
                                setCheckBuyProduct(false) 
                            }} >Đóng</button>
                        </div>
                    </div>
                    
                </div> : null}

                {check ? <NotiProduct text={text} setCheck={setCheck}/> : null}

            </div> : null}

            {showFeedBack === false ? null : 

            <div className={style.feed_back_parent} >

                <div className={style.feed_back} >
                    <div onClick={() => {
                        setShowFeedBack(false) 
                    }} className={style.exit} >
                        <div className={style.btn_exit} ><FiX style={{fontSize : '20px' ,  margin : 'auto'}} /></div>
                    </div>

                    <div className={style.title_form} >Đánh giá sản phẩm</div>

                    <div className={style.form_feedback} >
                        <input className={style.content_feedback} onChange={(e) => {
                            setState(e.target.value)
                        }} placeholder='Nhập cái gì cũng được' />

                        <button className={style.btn_add_feedback} onClick={() =>{
                            AddFeedBack(username, avatar, state, Infor.feedback_user.id_feed, dispatch)
                        }} >Bình luận</button>
                    </div>


                    <div className={style.list_feedback} >
                        {listFeedBack.length ===0 ? <div>Chưa có bình luận</div> : listFeedBack.map(data => 
                            <FeedBack socket={socket} data={data} id_feed={Infor.feedback_user.id_feed} />
                        )}
                    </div>

                </div>
                
               
            </div>}

        </div>
    )
}

export default InforProduct