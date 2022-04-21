let database = firebase.database().ref('purchases');

let submitButton = document.getElementById('submit')

let typeinput = document.getElementById('type')
let bought = document.getElementById('bought')
let fee = document.getElementById('fee')
let rate = document.getElementById('rate')

let holder = document.getElementById('holder')

let pTag = document.createElement('p')

let cryptoType = []
let cryptoName = []




function getCryptoInfo(type){
    fetch('https://api.coinbase.com/v2/prices/'+type+'-USD/buy')
      .then(function (response) {
          console.log(response)
          return response.json();
      }).then(function (data) {
          let x = data.data
          return x.amount;
      })
}

database.on("value", getPurchaseInfo)


function getPurchaseInfo(data) {
    var purchases = data.val();
    var keys = Object.keys(purchases);
    for(i = 0; i < keys.length; i++) {
        var k = keys[i];
        var type = purchases[k].TYPE;
        var bought = purchases[k].BOUGHT;
        var fee = purchases[k].FEE;
        var rate = purchases[k].RATE;

        let div = document.createElement("div");

        let typeText = document.createElement('p')
        let boughtText = document.createElement('p')
        let rateText = document.createElement('p')
        let feeText = document.createElement('p')
        let nowRateText = document.createElement('p')

        let typesAnsdTotals = [];

        if (cryptoName.includes(type) != true) {
            cryptoType.push(
                {
                    type : 0
                }
            )
            cryptoName.push(type)
        }

        

        fetch('https://api.coinbase.com/v2/prices/'+type+'-USD/buy')
            .then(function (response) {
                console.log(response)
                return response.json();
            }).then(function (data) {


                typeText.innerHTML = type 

                div.appendChild(typeText)
        
                holder.appendChild(div)

                let x = data.data
                return x.amount;


            })
    }
    console.log(cryptoType)
}

submitButton.onclick = function updateDB(event){
    event.preventDefault()
    console.log("hello")
    let value = {
        TYPE: typeinput.value,
        BOUGHT: bought.value,
        FEE: fee.value,
        RATE: rate.value
    }
    database.push(value)
    console.log(database)
}
 
  
  