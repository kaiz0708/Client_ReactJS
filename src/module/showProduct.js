import { Link } from "react-router-dom"
import { useDispatch , useSelector } from 'react-redux'
import { customTitle , customCost } from '../features/other/other'
import { removeProduct } from '../features/product/updateProductSlice'
import style from './styleShowProduct.module.scss'
import axios from 'axios'


let ApiDeleteProductAdmin = async (id_product, url_category, url_category_sub) => {
    let res = await axios.post('http://localhost:3800/admin/manager/delete/product', {
        id_product,
        url_category,
        url_category_sub
    })
    let data = await res.data
    return data
}

let DeleteProductAdmin = (id_product, url_category, url_category_sub, dispatch) => {
    ApiDeleteProductAdmin(id_product, url_category, url_category_sub).then(res => {
        dispatch(removeProduct(res.id_product_delete))
    })
}

function ShowProduct({data}){
    const { checkAdmin } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    return (
        <div className={style.listProduct} >
            {data.map(product => 
                <div className={style.product_infor_basic} >
                    <Link style={{textDecoration : 'none'}} to={`/product/${customTitle(product.title)}/${product.id_product}`}  >
                        <img className={style.picture_of_product} width={300} height={460} src={product.pic} alt="picture_of_product" /> 
                        <div className={style.title_product}>{product.title}</div>
                    </Link> 
                        <div className={style.cost}>{customCost(product.cost, product.discount, 1)}đ</div>
                        {checkAdmin === false ? null :  <button className={style.delete_product_admin} onClick={() => {
                            DeleteProductAdmin(product.id_product,product.url_category, product.url_category_sub, dispatch)
                        }} >XÓA SẢN PHẨM</button> }
                </div>
            )}
        </div>
    )
}

export default ShowProduct