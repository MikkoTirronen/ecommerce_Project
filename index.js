/* 
    Ecommerce website Javascript 1
*/
        const url=`https://mock-data-api.firebaseio.com/webb21/products.json`
        const productListContainer = document.getElementById("productList")
        const headContainer = document.getElementById("header")
        let currentTotal = 0

        function getDatabase(){
            fetch(url)
            .then(res => res.json())
            .then(data =>{
                renderProducts(data)
            })
        }

        getDatabase()

        function renderProducts(data){
            const filter = document.getElementById("input").value
            productListContainer.innerHTML =""

            Object.entries(data).forEach(item =>{
               if(item[1].rating >= filter || filter == ""){
                renderProductTags(item[0], item[1]) 
               }
            })
        }

        function renderProductTags(index, product){
            const myDiv = document.createElement('div')
            myDiv.id = `product_${index}`
            
            productListContainer.appendChild(addContents(product,myDiv))
        }
        /*
            Build the website 
        */
       function addContents(item, div){
            div.append(
                addHeading(item),
                addImage(item),
                addDescription(item),
                addStock(item),
                addRating(item),
                addPrice(item),
                addBuyButton(item)
                )

            return div
       }
        function addHeading(item){
            const productName = document.createElement('h2')
            productName.innerText = item.name
            return productName
        }
        function addImage(item){
            const productImage = document.createElement('img')
            productImage.src = item.images[0].src.small
            productImage.alt = item.images[0].alt
            productImage.height = 200
            productImage.width = 300
            // productImage.addEventListener('click', () =>{
            //     addToCart(item)
            // })
            return productImage
        } 
        function addDescription(item){
            const productDescription = document.createElement('p')
            productDescription.innerText = item.description
            return productDescription  
        }
        function addStock(item){
            const productStock = document.createElement('p')
            productStock.innerText = `Currently in Stock: ${item.stock}`
            return productStock
        }
        function addRating(item){
            const productRating = document.createElement('p')
            productRating.innerText = `This product has a rating of: ${item.rating}`
            return productRating
        }
        function addPrice(item){
            const productPrice = document.createElement('p')
            productPrice.innerText = `Cost: ${item.price} kr`
            return productPrice
        }
        function addBuyButton(item){
            const buyButton = document.createElement('button')
            buyButton.id = item.name
            buyButton.type ="submit"
            buyButton.innerText = `Buy: ${item.name}`
            buyButton.addEventListener('click', () =>{
                addToCart(item)
            })
            return buyButton
        }
        /* 
            Button Functions
        */
       function addToCart(item){
            const total = document.getElementById("total")
            createCartItem(item)
            const price = (parseInt(item.price))
            currentTotal += price
            total.innerHTML = `Current total: ${currentTotal} kr`
       }
       function createCartItem(item){
            const cart = document.getElementById("cart")
            const li = document.createElement('li')
            li.innerHTML = `${item.name} - ${item.price} kr.`
            cart.append(li) 
       }

    