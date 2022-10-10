import axios from 'axios'
import style from './styleFormAddProduct.module.scss'
import { useState } from 'react'
import NotiProduct from './notiProduct'

let ApiAddProduct = async (dataRequest) => {
    let res = await axios.post('http://localhost:3800/admin/manager/add/product' , {
        ...dataRequest
    })
    let data = await res.data
    return data
}

let AddProductAdmin = (dataRequest, setResultsAdd, setText) => {
    ApiAddProduct(dataRequest).then(res => 
        {
            setText('Thêm sản phẩm thành công')
            setResultsAdd(true)
    })
}




let getDataRequest = (className) => {
    let items = document.getElementsByClassName(className)
    let data = {}
    for( var i = 0 ; i < items.length ; i++ ){
        data[items[i].name] = items[i].value
    }
    return data
}

let getDataBasic = (className) => {
    let items = document.getElementsByClassName(className)
    let Cost = 'cost'
    let Discount = 'discount'
    let data = {}
    for( var i = 0 ; i < items.length ; i++ ){
        if(items[i].name === Cost || items[i].name === Discount){
            data[items[i].name] = Number(items[i].value)
        }else{
            data[items[i].name] = items[i].value
        }
    }
    return data
}

let getSizeRequest = (objSize, classColor) => {
    let Color = document.getElementsByClassName(classColor)
    return {
        "pic_color" : Color[0].value ,
        "size" : objSize
    }
}

let getDataDescribe = (className) => {
    let items = document.getElementsByClassName(className)
    let data = {}
    for( var i = 0 ; i < items.length ; i++ ){
        let obj  = {
            title : items[i].placeholder,
            content : items[i].value
        }
        data[items[i].name] = obj
    }
    return data
}


function FormAddProduct({setAddProduct}){
    const [ size, setSize  ] = useState('')
    const [ quantity , setQuantity ] = useState('')
    const [ objSize , setObjSize ] = useState([])
    const [ resultsAdd , setResultsAdd ] = useState(false)
    const [ text , setText ] = useState('')
    console.log(objSize)
    return (
        <div className={style.form_add_product} >
           
            <div className={style.form} >
                <div className={style.basic_infor} >
                    <div className={style.title} >Thông tin cơ bản</div>
                    <div className={style.title_sub} >Ảnh sản phẩm</div>
                    <input name='pic' className={style.basic_infor_sub} type={'text'} placeholder="Ảnh sản phẩm"/>
                    <div className={style.title_sub} >Brand</div>
                    <input name='brand' className={style.basic_infor_sub} type={'text'}  placeholder="Tên shop"/>
                    <div className={style.title_sub} >Tên sản phẩm</div>
                    <input name='title' className={style.basic_infor_sub} type={'text'} placeholder="Tên sản phẩm"/>
                    <div className={style.title_sub} >Gía sản phẩm</div>
                    <input name='cost' className={style.basic_infor_sub} type={'text'}  placeholder="Giá sản phẩm"/>
                    <div className={style.title_sub} >Giảm giá</div>
                    <input name='discount' className={style.basic_infor_sub} type={'text'} placeholder="Giảm giá" />
                </div>

                <div className={style.category} >
                    <div className={style.title} >Danh mục sản phẩm</div>
                    <div className={style.title_sub} >Danh mục</div>
                    <input className={style.category_sub} type={'text'} name='category' placeholder="Điền đúng theo mẫu yêu cầu"/>
                    <div className={style.title_sub} >Loại sản phẩm</div>
                    <input className={style.category_sub} type={'text'} name='category_sub' placeholder="Điền đúng theo mẫu yêu cầu"/>
                    <div className={style.title_sub} >Danh mục chính</div>
                    <input className={style.category_sub} type={'text'} name='type' placeholder="Điền đúng theo mẫu yêu cầu"/>
                </div>

                <div className={style.link} >
                    <div className={style.title} >Link truy cập</div>
                    <div className={style.title_sub} >Link danh mục</div>
                    <input className={style.link_sub} type={'text'} name='url_category' placeholder="Điền đúng theo mẫu yêu cầu"/>
                    <div className={style.title_sub} >Link loại sản phẩm</div>
                    <input className={style.link_sub} type={'text'} name='url_category_sub' placeholder="Điền đúng theo mẫu yêu cầu"/>
                </div>

                <div className={style.size} >
                    <div className={style.title} >Màu sắc và size</div>
                    <div className={style.title_sub} >Mã màu</div>
                    <div className={style.structure} >
                        <input className={style.structure_color} type={'text'} name='pic_color' placeholder="Nhập mã màu theo yêu cầu"/>
                        <div>Size và số lượng</div>
                        <div className={style.title_sub} >Size</div>

                        <input  onChange={(e) => {
                            setSize(e.target.value)
                        }} className={style.content} type={'text'} name='size' placeholder="Nhập mã màu theo yêu cầu"/>

                        <div className={style.title_sub} >Số lượng</div>
                        <input onChange={(e) => {
                            setQuantity(e.target.value)
                        }} className={style.content} type={'text'} name='quantity' placeholder="Nhập mã màu theo yêu cầu"/>

                        <div  style={{marginTop : '10px'}} >
                            <button className={style.btn_nav} onClick={() => {
                                let obj = {
                                    size_name : size,
                                    quantity : quantity
                                }
                                objSize.push(obj)
                                setObjSize(objSize)
                            }} >Thêm</button>
                        </div>
                    </div>

                    <div>
                        {objSize.map( (ele, index) => 
                            <div key={index} >
                                <span key={ele.size_name} >Size : <b>{ele.size_name}</b></span> 
                                <span key={ele.quantity} >Số lượng : <b>{ele.quantity}</b></span>
                            </div>
                        )}
                    </div>
                
                </div>

                <div className={style.describe} >
                    <div className={style.title} >Mô tả sản phẩm</div>
                    <div className={style.title_sub} >Chất liệu</div>
                    <input className={style.describe_sub} type={'text'} name='material' placeholder="Chất liệu"/>
                    <div className={style.title_sub} >Thiết kế</div>
                    <input className={style.describe_sub} type={'text'} name='form' placeholder="Kiểu dáng"/>
                    <div className={style.title_sub} >Công dụng</div>
                    <input className={style.describe_sub} type={'text'} name='fit' placeholder="Phù hợp"/>
                </div>

                <div className={style.btn_footer} >

                    <button className={style.btn_nav} onClick={()=>{
                        const dataRequest = {
                            common : getDataBasic(style.basic_infor_sub),
                            cate : getDataRequest(style.category_sub),
                            link : getDataRequest(style.link_sub),
                            about : getSizeRequest(objSize,style.structure_color),
                            describe : getDataDescribe(style.describe_sub)
                        }
                        AddProductAdmin(dataRequest, setResultsAdd, setText)
                        console.log(dataRequest)
                    }} >Thêm sản phẩm</button>

                    <button className={style.btn_nav} onClick={() => {
                        setAddProduct(false)
                        setObjSize([])
                    }} >Đóng</button>

                </div>

                

                {resultsAdd === false ? null : <div><NotiProduct text={text} setCheck={setAddProduct} /></div>}
            </div>
            
        </div>
        
    )
}

export default FormAddProduct