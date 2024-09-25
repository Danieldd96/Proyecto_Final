function validation(values) {
    let error={}
    const email_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const password_pattern=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (values.email === "") {
        error.email = "LLenar el espacio"
    }
    else if (!email_pattern.test(values.email)) {
        error.email="Email no coincide"
    }else{
        error.email=""
    }
    
    if (values.password === "") {
        error.password = "LLenar el espacio"
    }

    return error
    
}
export default validation