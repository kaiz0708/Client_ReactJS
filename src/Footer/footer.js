import style from './footer.module.scss'

function Footer(){
    return (
        <div className={style.footer} >
            <h3 className={style.title_footer} >NEM FASHION - THỜI TRANG CÔNG</h3>

            <div className={style.content_footer}>

                <div className={style.address} >
                    <p>Công ty TNHH Dịch vụ và Thương mại An Thành.
                    Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017</p>

                    <p>
                    Địa chỉ: Phòng 1002, tầng 10, Tòa nhà NEM
                    số 545 đường Nguyễn Văn Cừ, P. Gia Thụy, Q. Long Biên, Hà Nội
                    </p>

                    <p>
                    Chăm sóc khách hàng: 0243.9388512
                    Mua hàng online: 0246.2909098
                    </p>

                    <p>
                    Email: nemcskh@stripe-vn.com
                    </p>
                </div>

                <div className={style.about_nem} >
                    <p>Giới thiệu</p>
                    <p>Triết lý kinh doanh NEM fashion</p>
                    <p>Tuyển dụng</p>
                    <p>Hệ thống showroom</p>
                </div>

                <div className={style.other} >
                    <p>Chính sách giao hàng - vận chuyển</p>
                    <p>Hướng dẫn thanh toán</p>
                    <p>Tra cứu đơn hàng</p>
                    <p>Hướng dẫn chọn size</p>
                    <p>Khách hàng thân thiết</p>
                </div>


            </div>

            <div className={style.license} >
                2022 - Bản quyền NEM
            </div>
        </div>
    )
}


export default Footer
