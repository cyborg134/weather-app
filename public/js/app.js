console.log('Client side java script file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//message1.textContent = 'testing'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent = 'Loading'
    message2.textContent = ''
    //console.log(search.value)
    const url = 'http://localhost:3000/weather?address='+ encodeURIComponent(search.value)
    console.log(url)
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
           // console.log(data.error)
           message2.textContent = data.error
        }
        else
        {
            //console.log(data)
            message1.textContent = 'In '+data.address
            message2.textContent = data.forecast
            
        }
        
    })
})
})