import { Link , useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'
import { BsTelephone, BsHouseDoor, BsChevronDown, BsSearch, BsPerson, BsCart } from "react-icons/bs"
import { useSelector , useDispatch } from 'react-redux'
import { update } from '../features/update/updateUserSlice'
import { updateCart , reloadCartLogOut } from '../features/cart/cartSlice'
import { customCost, customTitle } from '../features/other/other'
import { updateProduct } from '../features/product/updateProductSlice'
import style from './header.module.scss'
import axios from 'axios'

import CategoryHeader from '../category/category_header'
import CategoryList from '../category/Categorylist'

let Api_auth_token = async () => {
    let token = localStorage.getItem('token')
    let refreshtoken = localStorage.getItem('refreshToken')
    let res = await  axios.post('http://localhost:3800/logined', {
        token, refreshtoken
    })
    let dataResponse = await res.data
    return dataResponse
}


let takeDataResponseAuth = (dispatch) => {
    Api_auth_token().then(dataResponse => {
        console.log(dataResponse)
        if(dataResponse.refreshtoken === false){
            let { username, avatar } = dataResponse.user_basic_infor
            dispatch(update({username, avatar}))
            dispatch(updateCart(dataResponse.cart))
        }else{
            if(dataResponse.new_token!==undefined){
                localStorage.setItem('token', dataResponse.new_token)
                takeDataResponseAuth(dispatch)
            }else{
                dispatch(update({
                    username : undefined,
                    avatar : ' '
                }))
            }
        }
    })
}

let Logout = (navigate, dispatch) =>{
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('id_user')
    dispatch(reloadCartLogOut([]))
    navigate('/' , {replace : true})
}


let searchProduct = (navigate, findProduct, dispatch) => {
    let new_string = findProduct.replace(/(\s+)/g, '-')
    dispatch(updateProduct([]))
    navigate(`/search?p=${new_string}` , {replace : true})
}




function Header() {
    let token = localStorage.getItem('token')
    let { username , avatar } = useSelector((state) => state.update)
    let { listCategory } = style
    let { listCart }  = useSelector((state) => state.cart)
    let { checkAdmin } = useSelector((state) => state.admin)
    const [findProduct , setFindProduct] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token !== null){
            takeDataResponseAuth(dispatch)
        }
        fetch('https://localhost:7032/WeatherForecast/Weather').then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
        })
    },[dispatch])
    return (
        <div className={style.Header} >
            <div className={style.Header_sub_1} >
                <div>
                    <Link style={{"color" : "white"}} className={style.header_text_decoration} to='/'> <BsHouseDoor/> Hệ Thống Cửa Hàng</Link>
                </div>

                <div>
                    <a style={{"color" : "white"}} className={style.header_text_decoration} href="tel:0326230072"> <BsTelephone/> Mua Hàng Online : 0326230072</a>
                </div>
            </div>

            <div className={style.Header_sub_2} >
                <div className={style.brand}>
                    <img className={style.brand_picture} src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=136" alt="picture_brand" />
                </div>

                <div className={style.category_parent} >
                    <div className={style.category_sub} >
                        <Link className={style.header_text_decoration} style={{color : "rgba(7, 7, 7, 0.5)"}} to='/'>SẢN PHẨM <BsChevronDown/></Link>
                        <CategoryHeader data={CategoryList} classProperty={listCategory} />
                    </div>

                    <div className={style.category_sub} >
                        <Link className={style.header_text_decoration} style={{color : "rgba(7, 7, 7, 0.5)"}} to='/'>SẢN PHẨM MỚI<BsChevronDown/></Link>
                    </div>

                    <div className={style.category_sub} >
                        <Link className={style.header_text_decoration} style={{color : "rgba(7, 7, 7, 0.5)"}} to='/'>SALE <BsChevronDown/> </Link>
                        <CategoryHeader data={[CategoryList[0]]} classProperty={listCategory} />
                    </div>

                    {checkAdmin ? <div className={style.category_sub}>
                        <Link className={style.header_text_decoration} style={{color : "rgba(7, 7, 7, 0.5)"}} to='/admin/nguyenkyanh07082003/user'>QUẢN LÍ NGƯỜI DÙNG</Link>
                    </div> : null}

                    {checkAdmin ? <div className={style.category_sub} >
                        <Link className={style.header_text_decoration} style={{color : "rgba(7, 7, 7, 0.5)"}} to='/admin/nguyenkyanh07082003/purchase'>QUẢN LÍ ĐƠN HÀNG</Link>
                    </div> : null}
                    
                </div>
                    
                

                <div className={style.account} >
                    <div className={style.search} >
                        <BsSearch style={{fontSize : '18px'}} /> <span style={{lineHeight : '20px', marginLeft : '5px'}} >Tìm kiếm</span> 
                        <div className={style.content_search} >
                            <input className={style.input_content} type={'text'} placeholder='Tìm kiếm tại đây' onChange={(e) => {
                                    setFindProduct(e.target.value)
                            }}/>
                            <button className={style.button_search} onClick={() => {
                                searchProduct(navigate, findProduct, dispatch)
                            }}><BsSearch color='white' /></button> 
                        </div>
                       
                    </div>


                    { token === null ? <div className={style.account}>
                        <BsPerson style={{fontSize : "18px"}} /> <span style={{lineHeight : '20px', marginLeft : '5px'}} >Tài Khoản</span> 
                        <div className={style.btn_nav} >
                            <div className={style.btn_nav_sub}>
                                <Link className={style.header_text_decoration}  to='/login'>Đăng nhập</Link>
                            </div>

                            <div className={style.btn_nav_sub}>
                                <Link className={style.header_text_decoration}  to='/signup'>Đăng kí</Link>
                            </div>
                        </div>
                    </div> : 
                    <div  className={style.account}> 
                        {avatar === ' ' ? <BsPerson style={{fontSize : "18px"}} />  : <img style={{borderRadius : '20px'}} width={20} height={20} src={avatar} alt='lolololololo' />}
                        <span style={{lineHeight : '20px', marginLeft : '5px'}} >{username}</span>
                        <div className={style.btn_nav} >

                            <div className={style.btn_nav_sub} >
                                <Link className={style.header_text_decoration} to='/user/account/profile'>Thông tin cá nhân</Link>
                            </div>

                            <div className={style.btn_nav_sub} >
                                <Link className={style.header_text_decoration} to='/user/account/cart'>Giỏ hàng</Link>
                            </div>

                            <div className={style.btn_nav_sub} >
                                <Link className={style.header_text_decoration} to='/user/account/purchase'>Đơn mua</Link>
                            </div>

                            <div onClick={() => {
                                Logout(navigate, dispatch)
                            }} className={style.btn_nav_sub} >
                                Đăng xuất
                            </div>

                        </div>
                    </div> }
                    

                    <div className={style.cart_user} >
                        <BsCart style={{fontSize : '18px'}} />  <span style={{lineHeight : '20px'}} > {listCart.length} Giỏ hàng</span>
                        <div className={style.cart} >
                            {listCart.length === 0 ? <div></div> : listCart.map((cart) => 
                                <div className={style.card_sub} key={cart.id_cart} >
                                    <img width={80} height={100} src={cart.infor_product.pic} alt='picture_of_product' />
                                    <div className={style.content_card}>
                                        <Link className={style.header_text_decoration} to={`/product/${customTitle(cart.infor_product.title)}/${cart.id_product}`} >
                                            <div><b>Tên sản phẩm :</b> {cart.infor_product.title} </div> 
                                            <div><b>Giá :</b> {customCost(cart.infor_product.cost, cart.infor_product.discount, 1)}đ</div>
                                            <div><b>Số lượng :</b> {cart.quantity}</div>
                                            <div><b>Size :</b> {cart.size}</div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div className={style.watch_card} >
                                <Link className={style.header_text_decoration} to='/user/account/cart' >Xem giỏ hàng</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Header