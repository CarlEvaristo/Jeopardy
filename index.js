const form = document.getElementById("newgame")
form.addEventListener("submit", function(event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    let count = formData.get("count")
    let offset = formData.get("offset")

    document.getElementById("jeopardyGrid").innerHTML = ""
    getCategories(count, offset).then(categories => {  //max 18400
        getHtml(categories)
    })
})

async function getCategories(count, offset) {
    let response = await fetch(`https://jservice.io/api/categories?count=${count}&offset=${offset}`)
    document.getElementById("jeopardyGrid").style = `grid-template-columns: repeat(${count}, 1fr);`
    let data = await response.json()
    return data
}

function getHtml(categories) {
    categories.map(category => 
        document.getElementById("jeopardyGrid").innerHTML += `
            <div class="gridColumn">
                <div class="gridItem my-category-title">${category.title}</div>
                <div class="gridItem">$100</div>
                <div class="gridItem">$200</div>
                <div class="gridItem">$300</div>
                <div class="gridItem">$400</div>
            </div
            `).join("")
}

getCategories(5 , 100).then(categories => {  //max 18400
    getHtml(categories)
})