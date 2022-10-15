const form = document.querySelector('.form-add-todo ')
const table = document.querySelector('.table-body')
const products = [
  {
    name: 'Mesa',
    price: 17,
    description: 'Mesa Gamer',
    available: 'não'
  },
  {
    name: 'Computador',
    price: 2000,
    description: 'Usado',
    available: 'sim'
  }
]

let feedbackAddProduct = document.createElement('p')

const checkNullInput = (valuesInputs = []) => valuesInputs.some(item => item.trim() === "")

const manipulateDOM = () => {
  const ascendingOrderByPrice = products.sort((item1, item2) => item1.price - item2.price)
  let trTable = ''

  ascendingOrderByPrice.forEach(({ name, price, description, available }) => {
    trTable += `
    <tr data-item ="${name}">
        <td>${name}</td>
        <td>R$${price}</td>
        <td>${description}</td>
        <td>${available}</td>
        <td><i class="far fa-trash-alt" data-trash="${name}"></td>
    </tr>`
  })

  table.innerHTML = trTable
}

const addNewItem = event => {
  event.preventDefault()
  feedbackAddProduct.textContent = ""
  const nameProduct = event.target.name.value
  const productPrice = event.target.preco.value
  const productDescription = event.target.descricao.value
  const isavailable = event.target.radio.value

  const valuesInputs = [nameProduct, productPrice, productDescription, isavailable]
  const isNull = checkNullInput(valuesInputs)

  if (isNull) {
    feedbackAddProduct.textContent = 'Preencha todas as informações !'
    feedbackAddProduct.classList.add('status')
    form.insertAdjacentElement('beforeend', feedbackAddProduct)
    return
  }
  products.push({
    name: `${nameProduct}`,
    price: `${productPrice}`,
    description: `${productDescription}`,
    available: `${isavailable}`
  })

  manipulateDOM()
  event.target.name.focus()
  event.target.reset()
}

const removeItemFromDataArray = trashDataValue => {
  products.forEach(({ name }, index) => {
    const arrayItemAndTrashEqualValues = trashDataValue === name

    if (arrayItemAndTrashEqualValues)
      products.splice(index, 1)
  })
}

const removeItemDOM = event => {
  const clickedElement = event.target
  const trashDataValue = clickedElement.dataset.trash
  const tableRowTr = document.querySelector(`[data-item = "${trashDataValue}"]`)

  removeItemFromDataArray(trashDataValue)

  if (trashDataValue) {
    tableRowTr.remove()
  }
}

form.addEventListener('submit', addNewItem)
table.addEventListener('click', removeItemDOM)

