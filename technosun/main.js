const categoryList = [
  { title: "فلش مموری", image: productList[3].image_path },
  { title: "رم و کارت حافظه", image: productList[0].image_path },
  { title: "هارد اکسترنال", image: productList[6].image_path },
  { title: "هارد اینترنال", image: productList[7].image_path },
  { title: "حافظه SSD", image: productList[8].image_path },
  { title: "CD و DVD", image: productList[9].image_path },
]

function CategoryCard(props) {
  const category = props.category

  return `
    <div class="bg-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2">
      <img
        src="${category.image}"
        alt="${category.title}"
        class="w-full h-20 object-contain"
      />
      <p class="text-xs font-bold text-center">${category.title}</p>
    </div>
  `
}


function CategoryWrapper(props) {
  const categoryContainer = document.getElementById("categories")

  categoryContainer.innerHTML = props.categories.map((item) => {
      return CategoryCard({ category: item });
    })
    .join("")
}

function ProductCard(props) {
  const product = props.product
  const hasDiscount = product.percent !== 0 && product.old_price !== 0
  const price = Number(product.price).toLocaleString("fa-IR")
  const oldPrice = Number(product.old_price).toLocaleString("fa-IR")

  return `
    <article class="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col h-[320px] shadow-sm">
      ${
        product.expire_time
          ? `<div class="h-10 border border-rose-200 rounded-full flex items-center justify-between px-3 text-xs mb-3">
              <span class="text-rose-700 font-bold">${product.expire_time}</span>
              <span class="flex items-center gap-2 text-gray-600">
                <span>فروش ویژه</span>
                <span class="text-rose-600 text-base">◷</span>
              </span>
            </div>`
          : `<div class="h-10 mb-3"></div>`
      }

      <div class="h-36 flex items-center justify-center">
        <img src="${product.image_path}" alt="${product.heading}"
          class="max-w-full max-h-full object-contain" />
      </div>

      <h2 class="text-xs leading-6 text-right font-medium mt-2 min-h-12 line-clamp-2">
        ${product.heading}
      </h2>

      <div class="mt-auto pt-2">
        <div class="flex items-center gap-2 min-h-6 mb-1">
          ${
            hasDiscount
              ? `<span class="bg-rose-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">${product.percent}٪</span>
                 <del class="text-[10px] text-gray-400">${oldPrice}</del>`
              : ""
          }
        </div>

        <div class="flex items-center justify-between gap-2 -translate-y-1">
          <p class="font-extrabold text-sm text-gray-900">${price} تومان</p>
          <button type="button" aria-label="افزودن به سبد خرید"
            class="w-8 h-8 shrink-0 rounded-lg bg-rose-600 text-white text-2xl leading-none flex items-center justify-center">+</button>
        </div>
      </div>
    </article>
  `
}


function ProductWrapper(props) {
  const productContainer = document.getElementById("product-list")

  productContainer.innerHTML = props.products.map((item) => {
      return ProductCard({
        product: item
      })
    })
    .join("")
}

CategoryWrapper({
  categories: categoryList
})

ProductWrapper({
  products: productList
})
