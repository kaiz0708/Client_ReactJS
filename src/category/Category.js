import { Link } from "react-router-dom"
import style from './Category.module.scss'

function Category({data}){
    return (
        <div className={style.contain_category} >
            <div className={style.title} >Danh mục</div>
            <Link className={style.category_text_dicoration + " " + style.category_link} to='/tat-ca-san-pham'>Tất cả sản phẩm</Link>

            <div className={style.listCategory}>
                {data.map(cateParent => 
                    <div className={style.category} key={cateParent.id}>
                        <div className={style.category_parent}>
                            <Link className={style.category_text_dicoration + ' ' + style.category_link} to={cateParent.url}>{cateParent.title}</Link>
                        </div>
                        <div className={style.category_list_sub} >
                            {cateParent.list_sub.map(cateSub =>
                                <div className={style.category_sub} >
                                     <Link className={style.category_text_dicoration + " " + style.category_link_sub} key={cateSub.id} to={cateParent.url + cateSub.url} >{cateSub.title}</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default Category