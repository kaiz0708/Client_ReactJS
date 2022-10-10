import { useParams , useSearchParams  } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { useEffect , useMemo } from 'react'
import { updateProduct } from '../features/product/updateProductSlice'
import { updatePageSize } from '../features/pageSize/pageSizeSlice'
import  ShowProduct  from '../module/showProduct'
import axios from 'axios'
import Category from '../category/Category'
import CategoryList from '../category/Categorylist'
import style from './Product.module.scss'

let ApiGetProduct = async (url_cate) => {
    let pageSize = getPageSize()
    let page = null
    pageSize === null ? page = 1 : page = pageSize
    let res = await axios.get('http://localhost:3800/product' , {
        "params" : {
            path_cate : url_cate,
            "page": page
        }
    })
    let dataResponse = await res.data
    return dataResponse
}

let ApiGetProductSub = async (url_cate, url_cate_sub) => {
    let pageSize = getPageSize()
    let page = null 
    pageSize === null ? page = 1 : page = pageSize
    let res = await axios.get('http://localhost:3800/product_sub' , {
        "params" : {
            path_cate : url_cate,
            path_cate_sub : url_cate_sub,
            "page" : page
        }
    })
    let dataResponse = await res.data
    return dataResponse
}

let getPageSize = () => {
    let paramsString = document.location.search
    let searchParams = new URLSearchParams(paramsString)
    let pageSize = searchParams.get('page')
    return pageSize
}

let takeDataPage = ( url_cate, url_cate_sub, dispatch) => {
    if(url_cate_sub===undefined){
        ApiGetProduct(url_cate).then(dataResponse => {
            takeDataResponse(dataResponse, dispatch)
        })
    }else{
        ApiGetProductSub(url_cate, url_cate_sub).then(dataResponse =>{
            takeDataResponse(dataResponse, dispatch)
        })
    }
}


let takeDataResponse = (dataResponse, dispatch) => {
    console.log(dataResponse)
    dispatch(updateProduct(dataResponse.infor_product))
    dispatch(updatePageSize(dataResponse.quantity_page))
}

let createObj = (url_cate, url_cate_sub, dispatch) => {
    return {
        url_cate,
        url_cate_sub,
        dispatch
    }
}


function Product () {
    let { listProduct } = useSelector((state) => state.product)
    let { listPage } = useSelector((state) => state.pageSize)
    let { url_cate, url_cate_sub } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()
    const obj = useMemo(() => createObj(url_cate, url_cate_sub, dispatch), [url_cate, url_cate_sub, dispatch]) 
    useEffect(()=> {
        let { url_cate, url_cate_sub, dispatch } = obj
        if(url_cate_sub === undefined){
            ApiGetProduct(url_cate).then(dataResponse => { 
                takeDataResponse(dataResponse, dispatch)
            })
        }else{
            ApiGetProductSub(url_cate, url_cate_sub).then(dataResponse => {
                takeDataResponse(dataResponse, dispatch)
            })
        }
    }, [obj])
    return (
        <div className={style.showProduct}>
            <h1>Sản Phẩm</h1>
            <div className={style.content} >
                <Category data={CategoryList} />
                <ShowProduct data={listProduct} />
            </div>
            
            <div className={style.pageSize} >
                {listPage.map(ele => 
                    <button className={style.btn_pageSize} onClick={() => {
                        setSearchParams({page : ele.page})
                        takeDataPage(url_cate, url_cate_sub, dispatch)
                    }} key={ele.page} style={ele.page === ele.check ? {backgroundColor : "black" ,color : 'white' } : {}} >{ele.page}</button>
                )}
            </div>

        </div>


    )
}

export default Product