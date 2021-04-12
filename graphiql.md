fragment FindCategory on CategoryType {
  _id
  name
  products {
    _id
    name
  }
}

fragment FindProduct on ProductType {
  _id
  name
  description
  category {
    _id
    name
  }
  weight
}

mutation NewCategory {
  newCategory(name: "Gadgets") {
    _id
    name
  }
}

mutation DeleteCategory {
  deleteCategory(_id: "6074b8cd3bd825a36d066a3a") {
    _id
  }
}

mutation NewProduct {
  newProduct(name: "Drone", description: "This thing flies mighty high and will satisfy all your peepin' needs") {
    _id
    name
  }
}

mutation DeleteProduct {
  deleteProduct(_id: "6074b9473bd825a36d066a3c") {
    _id
  }
}

mutation UpdateProductCategory {
  updateProductCategory(productId: "6074b6c43bd825a36d066a37", categoryId: "6074b6563bd825a36d066a36") {
    ...FindProduct
  }
}

query FetchCategories {
  categories {
    _id
    name
    products {
      _id
      name
    }
  }
}

query FetchCategory {
  category(_id: "6074ac05011309901277b7a6") {
    _id
    name
    products {
      name
    }
  }
}

query FetchProducts {
  products {
    _id
    name
    category {
      _id
      name
    }
    weight
  }
}

query FetchProduct {
  product(_id: "6074b5273bd825a36d066a35") {
    _id
    name
    description
    category {
      _id
      name
    }
    weight
  }
}