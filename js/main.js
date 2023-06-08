//Declaring Variables
const ProductName = document.getElementById("ProductName");
const ProductCategory = document.getElementById("ProductCategory");
const ProductPrice = document.getElementById("ProductPrice");
const ProductDescription = document.getElementById("ProductDescription");
const TableBody = document.getElementById("TableBody");
const SearchInput = document.getElementById("SearchInput");
const AddBtn = document.getElementById("add-btn");
const ProductNameFalseValidate = document.getElementById("ProductNameFalseValidate");
const ProductCategoryFalseValidate = document.getElementById("ProductCategoryFalseValidate");
const ProductPriceFalseValidate = document.getElementById("ProductPriceFalseValidate");
const ProductDescriptionFalseValidate = document.getElementById("ProductDescriptionFalseValidate");
const EmptyFieldCheck = document.getElementById("EmptyFieldCheck");
const ToTop = document.getElementById("to-top");
let Products = [];
let CurrentIndex = 0;

//Update LocalStorage Function
function UpdateLocalStorage() {
  localStorage.setItem("Products", JSON.stringify(Products));
}

//Self Invoke Function to Get Data From LocalStorage
(function GetFromLocalStorage() {
  if (localStorage.getItem("Products") != null) {
    Products = JSON.parse(localStorage.getItem("Products"));
    DisplayProducts(Products);
  } else {
    Products = [];
  }
})();

//Add New Product Function
function AddProduct() {
  if (!EmptyInputsChecker()) {
    if (AddBtn.innerHTML == "Add Product") {
      if (AllFieldsVaidator()) {
        let Product = {
          Name: ProductName.value,
          Category: ProductCategory.value,
          Price: ProductPrice.value,
          Description: ProductDescription.value,
        };
        Products.push(Product);
        clearForm();
      }
    } else if (AddBtn.innerHTML == "Update Product") {
      Products[CurrentIndex] = {
        Name: ProductName.value,
        Category: ProductCategory.value,
        Price: ProductPrice.value,
        Description: ProductDescription.value,
      };
      AddBtn.innerHTML = "Add Product";
      clearForm();
    }
    UpdateLocalStorage();
    DisplayProducts(Products);
  }
}

//Display The Products Function
function DisplayProducts(ProductsArr) {
  let ProductsHTML = "";
  for (let i = 0; i < ProductsArr.length; i++) {
    ProductsHTML += `<tr>
    <td>${i + 1}</td>
    <td>${ProductsArr[i].Name}</td>
    <td>${ProductsArr[i].Category}</td>
    <td>${ProductsArr[i].Price}</td>
    <td>${ProductsArr[i].Description}</td>
    <td><i onclick = "UpdateProduct(${i})" class="fa-regular fa-pen-to-square main-color"></i></td>
    <td><i onclick = "DeleteProduct(${i})" class="fa-solid fa-circle-minus delete-icon"></i></td>
    </tr>`;
  }
  TableBody.innerHTML = ProductsHTML;
}

//Delete Product Function
function DeleteProduct(ProductIndex) {
  Products.splice(ProductIndex, 1);
  UpdateLocalStorage();
  DisplayProducts(Products);
}

//Update Product Function
function UpdateProduct(ProductIndex) {
  CurrentIndex = ProductIndex;
  ProductName.value = Products[ProductIndex].Name;
  ProductCategory.value = Products[ProductIndex].Category;
  ProductPrice.value = Products[ProductIndex].Price;
  ProductDescription.value = Products[ProductIndex].Description;
  AddBtn.innerHTML = "Update Product";
}

//Clear Form Function
function clearForm() {
  ProductName.value = "";
  ProductCategory.value = "";
  ProductPrice.value = "";
  ProductDescription.value = "";
}

//Search By Product Name Function
function ProductSearch() {
  let SearchedProducts = [];
  for (let i = 0; i < Products.length; i++) {
    if (
      Products[i].Name.toLowerCase().includes(SearchInput.value.toLowerCase())
    ) {
      SearchedProducts.push(Products[i]);
    }
  }
  DisplayProducts(SearchedProducts);
}

//Product Name Validate Function
function ValidateProductName() {
  const ProductNameRegex = /^[A-Z][a-z]{2,12}$/;
  if (ProductNameRegex.test(ProductName.value)) {
    ProductName.classList.remove("is-invalid");
    ProductName.classList.add("is-valid");
    ProductNameFalseValidate.classList.add("d-none");
    return true;
  } else {
    ProductName.classList.remove("is-valid");
    ProductName.classList.add("is-invalid");
    ProductNameFalseValidate.classList.remove("d-none");
    return false;
  }
}

//Product Category Validate Function
function ValidateProductCategory() {
  const ProductCategoryRegex = /^[A-Z][a-z]{3,12}$/;
  if (ProductCategoryRegex.test(ProductCategory.value)) {
    ProductCategory.classList.remove("is-invalid");
    ProductCategory.classList.add("is-valid");
    ProductCategoryFalseValidate.classList.add("d-none");
    return true;
  } else {
    ProductCategory.classList.remove("is-valid");
    ProductCategory.classList.add("is-invalid");
    ProductCategoryFalseValidate.classList.remove("d-none");
    return false;
  }
}

//Product Price Validate Function
function ValidateProductPrice() {
  const ProductPriceRegex = /^([0-9]{1,4}|10000)$/;
  if (ProductPriceRegex.test(ProductPrice.value)) {
    ProductPrice.classList.remove("is-invalid");
    ProductPrice.classList.add("is-valid");
    ProductPriceFalseValidate.classList.add("d-none");
    return true;
  } else {
    ProductPrice.classList.remove("is-valid");
    ProductPrice.classList.add("is-invalid");
    ProductPriceFalseValidate.classList.remove("d-none");
    return false;
  }
}

//Product Description Validate Function
function ValidateProductDescription() {
  let ProductDescriptionLength = ProductDescription.value;
  if (ProductDescriptionLength.length > 3) {
    ProductDescription.classList.remove("is-invalid");
    ProductDescription.classList.add("is-valid");
    ProductDescriptionFalseValidate.classList.add("d-none");
    return true;
  } else {
    ProductDescription.classList.remove("is-valid");
    ProductDescription.classList.add("is-invalid");
    ProductDescriptionFalseValidate.classList.remove("d-none");
    return false;
  }
}

//Check If There Is Empty Field Function
function EmptyInputsChecker() {
  if (ProductName.value == "" || ProductCategory.value == "" || ProductPrice.value == "" || ProductDescription.value == "") {
    EmptyFieldCheck.classList.remove("d-none");
    return true
  }
  else {
    EmptyFieldCheck.classList.add("d-none");
    return false;
  }
}

//Check if All Inputs Are Validated
function AllFieldsVaidator() {
  if (ValidateProductName() && ValidateProductCategory() && ValidateProductPrice() && ValidateProductDescription()) {
    return true;
  } else {
    return false;
  }
}

//Real Time Search Button
SearchInput.addEventListener("keyup", () => ProductSearch());

//Add Product Button
AddBtn.addEventListener("click", () => AddProduct());

//Real Time Product Name Validate
ProductName.addEventListener("keyup", () => {
  ValidateProductName();
  EmptyInputsChecker();
});

//Real Time Product Category Validate
ProductCategory.addEventListener("keyup", () => {
  ValidateProductCategory();
  EmptyInputsChecker();
});

//Real Time Product Price Validate
ProductPrice.addEventListener("keyup", () => {
  ValidateProductPrice();
  EmptyInputsChecker();
});

//Real Time Product Description Validate
ProductDescription.addEventListener("keyup", () => {
  ValidateProductDescription();
  EmptyInputsChecker();
});

//Scroll To Top Button
ToTop.addEventListener("click", () => {
  if (window.pageYOffset >= 152) {
    window.scrollTo(0, 0);
  }
});

//Show And Hide To Top Button At Specific Scroll Hieght
document.addEventListener("scroll", () => {
  if (window.pageYOffset >= 152) {
    ToTop.classList.remove("opacity-0");
    ToTop.classList.add("cursor-pointer");
  }
  else {
    ToTop.classList.add("opacity-0");
    ToTop.classList.remove("cursor-pointer");
  }
})

