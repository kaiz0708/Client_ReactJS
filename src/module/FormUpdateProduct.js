import axios from "axios"
import style from "./styleFormUpdate.module.scss"

let ApiUpdateUser = async (data) => {
    let res = await axios.post('http://localhost:3800/admin/manager/update/product',{
        ...data
    })
    let dataRes = await res.data
    return dataRes
}

let UpdateProductAdmin = ( dataRequest) => {
    ApiUpdateUser(dataRequest).then(res => {
        console.log(res)
    })
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


let getSizeRequest = (classColor, classSize, classQuantity) => {
    let Size = document.getElementsByClassName(classSize)
    let Quantity = document.getElementsByClassName(classQuantity)
    let Color = document.getElementsByClassName(classColor)
    let arr_size = []
    for( let i = 0 ; i < Size.length ; i++ ){
        let obj = {
            "size_name" : Size[i].value,
            "quantity" : Quantity[i].value
        }
        arr_size.push(obj)
    }

    return {
        "pic_color" : Color[0].value,
        "size" : arr_size
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

function UpdateProduct({data, id_product, setUpdateProduct}){
    console.log('lololo', data)
    return (
        <div className={style.form_update}>
            <div className={style.form}>
                <div className={style.infor_basic} >
                    <h2 className={style.title_parent} >Thông tin cơ bản</h2>

                    <div className={style.title} >Link ảnh sản phẩm</div>
                    <input className={style.basic_infor_update} name='pic' type={'text'} defaultValue={data.infor_product.pic} />
                    <div className={style.title} >Tên sản phẩm</div>
                    <input className={style.basic_infor_update} name='title' type={'text'} defaultValue={data.infor_product.title} />
                    <div className={style.title} >Giá</div>
                    <input className={style.basic_infor_update} name='cost' type={'text'} defaultValue={data.infor_product.cost} />
                    <div className={style.title} >Giảm giá</div>
                    <input className={style.basic_infor_update} name='discount' type={'text'} defaultValue={data.infor_product.discount} />
                </div>

                <div className={style.size_color} >
                    <h2 className={style.title_parent} >Kích thước và màu sắc</h2>

                    <div className={style.structure_size} >
                        {data.size.map(size => 
                        <div>
                            <div className={style.title} >Kích thước</div>
                            <input className={style.structure_size_update} name="size_name" defaultValue={size.size_name} type={'text'} />
                            <div className={style.title} >Số lượng</div>
                            <input className={style.structure_quantity_update} name='quantity' defaultValue={size.quantity} type={'text'} />
                        </div> 
                        )}
                    </div> 


                    <div className={style.structure_color} >
                        <div className={style.title} >Màu sắc</div>
                        <input className={style.structure_color_update} name='pic_color' defaultValue={data.pic_color} type={'text'}/>
                    </div>
                </div>


                <div className={style.describe} >
                    <h2 className={style.title_parent} >Mô tả sản phẩm</h2>

                    <div className={style.title} >Chất liệu</div>
                    <input className={style.describe_sub} type={'text'} defaultValue={data.material.content} name='material' placeholder="Chất liệu"/>
                    <div className={style.title} >Thiết kế</div>
                    <input className={style.describe_sub} type={'text'} defaultValue={data.form.content} name='form' placeholder="Kiểu dáng"/>
                    <div className={style.title} >Công dụng</div>
                    <input className={style.describe_sub} type={'text'} defaultValue={data.fit.content} name='fit' placeholder="Phù hợp"/>
                </div>    

                <div className={style.btn_footer} >
                    <button className={style.btn_nav} onClick={() => {
                        let dataRequest = {
                            id_product : id_product,
                            new_common : getDataBasic(style.basic_infor_update),
                            new_about : getSizeRequest(style.structure_color_update, style.structure_size_update, style.structure_quantity_update),
                            new_describe : getDataDescribe(style.describe_sub)
                        }
                        console.log(dataRequest)
                        UpdateProductAdmin(dataRequest)
                    }} >Cập nhật sản phẩm</button>

                    <button className={style.btn_nav} onClick={() => {
                        setUpdateProduct(false)
                    }} >Đóng</button>
                </div>

            </div>
            
        </div>
    )
}

export default UpdateProduct