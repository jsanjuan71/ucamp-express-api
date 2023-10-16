const validationMessages = {
    required: "The field {0} is required",
    minlength: "This field must be at least {0} characters long",
    maxlength: "This field must be less than {0} characters long",
    min: "This field must be greater than {0}",
    max: "This field must be less than {0}",
    enum: "This field must be one of the following values: {0}",
    unique: "The field '{0}' must be unique",
    no_description: "No description",
}

const getValidationMessage = (message, params = []) => {
    let newMessage = message
    params.forEach((param, index) => {
        newMessage = newMessage.replace(`{${index}}`, param)
    })
    return newMessage
}

module.exports = {
    validationMessages,
    getValidationMessage
}