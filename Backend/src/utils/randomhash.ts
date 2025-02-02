const random =(len:number):string=>{
    const str= "shuvdbsahbib1r66278689721979"
    let num:string=""
    for(let i=0;i<=len;i++){
       num=num+(str[Math.floor(Math.random()*len)])
    }
    const hash=num.toString()
    return hash
    }

export default random;