import Category, { CategoryRaw } from './models/category'

const listCategories = async () => {
  const categories = await Category.find({})

  return categories
}

const createCategory = async (rawCategory: CategoryRaw) => {
  const category = await Category.create({
    name: rawCategory.name,
  })

  return category
}

const CategoryManager = {
  createCategory,
  listCategories,
}

export default CategoryManager
