export const addToCart = (info, quantity) => {
    return{
        type: "ADD_TO_CART",
        info: info,
        quantity: quantity
    }
}

export const increaseQuantity = (id) => {
    return {
        type: "INCREASE_QUANTITY",
        id: id
    }
}

export const decreaseQuantity = (id) => {
    return {
        type: "DECREASE_QUANTITY",
        id: id,
    }
}