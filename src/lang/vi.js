const transValidation = {
    EMAIL_INCORRECT: "Email phải có dạng example@email.com",
    PASSWORD_INCORRECT: "Mật khẩu phải có ít nhất 6 ký tự",
    PASSWORD_CONFIRMATION_INCORRECT: "Mật khẩu không khớp",
    AGE_INCORRECT: "Tuổi không hợp lệ, chỉ nhận chữ số"
}

const transError = {
    EMAIL_ALREADY: "Email đã được sử dụng, vui lòng dùng email khác",
    LOGIN_FAILED: "Sai email hoặc mật khẩu, vui lòng đăng nhập lại",
    IMAGE_UPLOAD_FAILED: "Chỉ được upload file ảnh",
    UNAUTHORIZED: "Token không hợp lệ",
    BLOCK_ACCOUNT: "Tài này khoản đã bị khóa"
}

const transSuccess = {
    USER_CREATED: (email) => {
        return `Tài khoản ${email} đã được tạo thành công`
    }
}

module.exports = {
    transValidation,
    transError,
    transSuccess
}
