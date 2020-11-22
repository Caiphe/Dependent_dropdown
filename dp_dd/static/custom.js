const carsDataBox = document.getElementById('card-data-box')
const carInput = document.getElementById('cars')
const modelsDataBox = document.getElementById('models-data-box')
const modelInput = document.getElementById('models')
const modelText = document.getElementById('model-text')
const carText = document.getElementById('car-text')
const btnBox = document.getElementById('btn-box')
const alertBox = document.getElementById('alert-box')
const subBtn = document.getElementById('submit-buttom')
const carForm = document.getElementById('car-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')


$.ajax({
    type: 'Get',
    url: '/cars-json/',
    success: function(response){
        const carsData = response.data
        carsData.map(item=>{
            const option = document.createElement('div');
            option.textContent = item.name
            option.setAttribute('class', 'item')
            option.setAttribute('data-value', item.name)
            carsDataBox.appendChild(option)
        })
    },
    error: function(error){
        console.log(error)
    }
})

carInput.addEventListener('change', e=>{
    console.log(e.target.value)
    const selectedCar = e.target.value

    modelsDataBox.innerHTML = ''
    modelText.textContent = "Choose a model"
    modelText.classList.add('default')
    alertBox.innerHTML = ''

    $.ajax({
        type: 'Get',
        url : `models-json/${selectedCar}/`,
        success: function(response){
            const modelsData = response.data
            modelsData.map(item=>{
                const option = document.createElement('div');
                option.textContent = item.name
                option.setAttribute('class', 'item')
                option.setAttribute('data-value', item.name)
                modelsDataBox.appendChild(option)
            })

            modelInput.addEventListener('change', e=>{
                btnBox.classList.remove('not-visible')
            })
        },
        error : function(error){
            console.log(error)
        }
    })
})

carForm.addEventListener('submit', e=>{
    e.preventDefault();
    console.log('submitted')

    $.ajax({
        type:"Post",
        url : 'create/',
        data: {
            'csrfmiddlewaretoken' : csrf[0].value,
            'car' : carText.textContent,
            'model' : modelText.textContent
        },
        success: function(response){
            console.log(response);
            alertBox.innerHTML = `
            <div class="ui success message">
                <i class="close icon"></i>
                <div class="header">
                    Success
                </div>
                <p>You order has been placed</p>
            </div>
            `
        },
        error: function(error){
            console.log(error);
            alertBox.innerHTML =
            `
            <div class="ui negative message">
                <i class="close icon"></i>
                <div class="header">
                    Oops!!!
                </div>
                <p>Something went wrong</p>
            </div>
            `

        }
    })
})
