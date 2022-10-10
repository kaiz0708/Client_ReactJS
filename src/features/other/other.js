export let customCost = (cost, discount, quantity) => {
    let costReal = (cost - (cost * discount/100)) * quantity
    return costReal.toLocaleString("en-US").replace(',', '.')
}

export let customTitle = (title) => {
    const new_title = title.replace(/(\s+)/g, '-');
    return new_title
}

export let createDataRequest = (cart, option) => {
    let { infor_product , id_product, id_cart, size } = cart 
    return {
        "title_product" : infor_product.title,
        "product" : {
            "id_product" : id_product,
            "quantity" : option,
            "size" : size
        },
        "id_cart" : id_cart
    }
}
