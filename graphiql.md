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

mutation NewProduct {
  newProduct(name: "Drone", description: "This thing flies mighty high and will satisfy all your peepin' needs") {
    _id
    name
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