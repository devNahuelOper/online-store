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

mutation RegisterUser {
  register(name: "Tara Service", email: "TaraService@hotmail.com", password: "taraservice") {
    _id
    name
    email
    token
  }
}

mutation LogoutUser {
  logout(_id: "6074cf72c6405add356a0811") {
    _id
    name
    email
    loggedIn
    token
  }
}

mutation LoginUser {
  login(email: "humphrydumpty@hotmail.com", password: "humphrey123") {
    _id
    name
    email
    loggedIn
    token
  }
}

mutation VerifyUser {
  verifyUser(token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzRjZjcyYzY0MDVhZGQzNTZhMDgxMSIsImlhdCI6MTYxODI2OTA5MH0.w_nWjpJFHQaIR8r7eirkpzKH82d_baSp42HJgAPFZrg") {
    loggedIn
  }
}

query FetchUser {
  user(_id: "6074cca8d54e18d78d309659") {
    _id
    name
    email
    loggedIn
    token
  }
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

mutation NewProduct {
  newProduct(
    name: "Sony Playstation 5"
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio*, and an all-new generation of incredible PlayStation® games."
    weight: 4.5
  ) {
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