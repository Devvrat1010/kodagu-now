const formData=document.getElementById('formData')
const submitButton=document.getElementById('submitButton')

const backend=window.localStorage.getItem('backend')
const root=window.localStorage.getItem('root')

submitButton.addEventListener('click',(e)=>{
    e.preventDefault()
    const email=formData.email.value
    const password=formData.password.value
    const username=formData.username.value
    const cpassword=formData.cpassword.value
    if (password!==cpassword){
        const message=document.getElementsByClassName('message')[0]
        message.innerText="Password and Confirm Password must be same*"
        return false;
    }
    signUp(email,password,username)
})

const signUp=(email,password,username)=>{
    fetch(backend+"api/createUser",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email,password:password,username:username})
    }).then((res)=>{
        if (res.status===200){
            return res.json()
        }
    }).then((data)=>{
        if (data.error){
            const message=document.getElementsByClassName('message')[0]
            message.innerText=data.error+"*"
            return
        }
        document.cookie=`LOGIN_INFO=${data.token}; path=/; max-age=${60 * 60 * 24 * 14};secure=true;`;
        window.location.href = root+"index.html";
    }).catch((err)=>{
        console.log(err)
    })
}