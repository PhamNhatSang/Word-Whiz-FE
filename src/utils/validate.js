export  function emailValidate(email){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(email.match(emailRegex)){
        return true;
    }else{
        return false;
    }
}

export  function passwordValidate(value){
   if(value.trim() === '')
       return "Password is required";
    
   if(value.length < 6)
       return "Password must be at least 6 characters";
   
   return "Password is valid";

}

export function roleCheck(role){
    if(role.trim() === '')
        return "Role is required";
}

