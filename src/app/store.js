import { configureStore } from '@reduxjs/toolkit'
import updateUser from '../features/update/updateUserSlice'
import updateProductSlice from '../features/product/updateProductSlice'
import updateCartSlice from '../features/cart/cartSlice'
import  updatePageSize  from '../features/pageSize/pageSizeSlice'
import  updateListPay  from '../features/listPay/listPay'
import  updateInforProductSlice from '../features/product/displayProduct'
import  updatePurchaseSlice from '../features/purchase/purchaseSlice'
import  checkAuthAdmiin  from '../features/checkAuth/checkAdmin'
import updateUserSlice from '../admin/featearAdmin/updateUserSlice'
import updateBillSlice from '../admin/featearAdmin/updateBillSlice'
import  updateFeedBack  from '../features/feedback/feedback'
export default configureStore({
  reducer: {
    update : updateUser,
    product : updateProductSlice,
    cart : updateCartSlice,
    pageSize : updatePageSize,
    listpay : updateListPay,
    InforProduct : updateInforProductSlice,
    purchase : updatePurchaseSlice,
    feedback : updateFeedBack,
    admin : checkAuthAdmiin,
    adminUser : updateUserSlice,
    adminBill : updateBillSlice
  },
})