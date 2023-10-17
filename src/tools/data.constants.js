const productCategories = ["Generic", "Laptop" , "Mobile" , "Tablet" , "Desktop" , "Camera" , "Printer" , "Accessories", "Dron" ]

const userRoles = [ "admin" , "user" , "dev" ]

const defaultValues = {
    noData : "No data",
    noDescription : "No description",
    noImage : "No image"
}

const modelNames = {
    products: "Product",
    users: "User"
}

module.exports = {
    productCategories,
    userRoles,
    defaultValues,
    modelNames
}