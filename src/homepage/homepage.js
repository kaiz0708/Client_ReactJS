import axios from 'axios'
import { useEffect , useState } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import ShowProduct from '../module/showProduct'
import { updateProduct } from '../features/product/updateProductSlice'
import { AiOutlineArrowRight , AiOutlineArrowLeft  } from "react-icons/ai";
import style from './homepage.module.scss'
import FormAddProduct from '../module/FormAddProduct'
import bander from './bander'

let ApiProductHomePage = async () => {
  let res = await axios.get('http://localhost:3800')
  let dataResponse = await res.data
  return dataResponse
}

let takeDataResponse = (dataResponse, dispatch) => {
  dispatch(updateProduct(dataResponse.infor_product))
}

function HomePage(){
    const [indexTag , setIndexTag] = useState(0)
    const [tagPicture , setTagpicture] = useState(bander[indexTag].src)
    const { listProduct } = useSelector((state) => state.product)
    const { checkAdmin }  = useSelector((state) => state.admin)
    const [ addProduct , setAddproduct ] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
      ApiProductHomePage().then(dataResponse => {
        takeDataResponse(dataResponse, dispatch)
      })
    }, [dispatch])
    return (
        <div className={style.homepage} >
          <div className={style.banner} >
            <img width="100%" src={tagPicture} alt='picture_title'/>
            <button className={style.button_left} onClick={() => {
              if(indexTag > 0){
                setTagpicture(bander[indexTag-1].src)
                setIndexTag(indexTag - 1)
              }
            }}><AiOutlineArrowLeft className={style.arrow_tag} /></button>
            <button className={style.button_right} onClick={() => {
              if(indexTag < 1){
                setTagpicture(bander[indexTag+1].src)
                setIndexTag(indexTag + 1)
              }
            }}><AiOutlineArrowRight className={style.arrow_tag} /></button>
          </div>
          
          <div>
            <h1 style={{textAlign : 'center'}} >SẢN PHẨM NỔI BẬT</h1>
            <ShowProduct data={listProduct} />
          </div>


          {checkAdmin === false ? null : <div className={style.add_product_admin} >
            <button className={style.btn_add_product_admin} onClick={() => {
            setAddproduct(true)
          }} >Thêm sản phẩm</button></div>}

          {addProduct ? <div>
            <FormAddProduct setAddProduct={setAddproduct} />
          </div>  : null}
        </div>
    )
}

export default HomePage