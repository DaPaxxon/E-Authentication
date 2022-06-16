const useCode = document.getElementById("code");
const useOtp = document.getElementById("otp");

useCode.addEventListener("change", function(){
    if (this.checked) {
        useOtp.checked=false
    }
})

useOtp.addEventListener("change", function(){
    if (this.checked) {
        useCode.checked=false
    }
})