import axios from 'axios'
import { useEffect , useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import ShowProduct from '../module/showProduct'
import { updateProduct } from '../features/product/updateProductSlice'
import style from './search.module.scss'

let ApiSearchProduct = async () => {
    let search = getContentSearch()
    let new_search = search.replace('+' , ' ')
    let res = await axios.get('http://localhost:3800/search', {
        params : {
            value : new_search
        }
    })
    let dataResponse = await res.data
    return dataResponse
}

let getContentSearch = () => {
    let paramsString = document.location.search
    let searchParams = new URLSearchParams(paramsString)
    let content = searchParams.get('p')
    return content
}

let getProductSearch = (setCheckProduct, dispatch) => {
    ApiSearchProduct().then(res => {
        console.log(res)
        if(res.search === false){
            setCheckProduct(true)
        }else{
            let product = res.results_search
            dispatch(updateProduct(product))
        }
    })
}

function Search(){
    const [checkProduct , setCheckProduct ] = useState(false)
    let { listProduct } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        getProductSearch(setCheckProduct, dispatch)
    }, [dispatch, setCheckProduct])
    return (
        <div className={style.search} >
            <h1 style={{textAlign : 'center'}} >Kết quả tìm kiếm</h1>
            {checkProduct === true ? <div style={{textAlign : 'center'}} >Không tìm thấy sản phẩm</div> :  <ShowProduct data={listProduct} />}
        </div>
    )
}

export default Search