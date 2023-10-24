const productCategories = ["Generic", "Laptop" , "Mobile" , "Tablet" , "Desktop" , "Camera" , "Printer" , "Accessories" ]

const userRoles = [ "admin" , "user" , "dev" ]

const defaultValues = {
    noData : "No data",
    noDescription : "No description",
    noImage : "No image"
}

const modelNames = {
    products: "Product",
    users: "User",
    posts: "Post",
}

module.exports = {
    productCategories,
    userRoles,
    defaultValues,
    modelNames
}