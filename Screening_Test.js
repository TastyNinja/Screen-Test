const categoryTree = {
  category1: {
    items: ["item1", "item2"],
    subcategories: {
      subcategory1a: {
        items: ["item3"],
        subcategories: {},
      },
      subcategory1b: {
        items: [],
        subcategories: {},
      },
    },
  },
  category2: {
    items: ["item4", "item5"],
    subcategories: {},
  },
};

const customerVisibilityData = {
  customer1: {
    visibleCategories: ["category1"],
    visibleItems: ["item1", "item2"],
  },
  customer2: {
    visibleCategories: ["category1", "category2"],
    visibleItems: ["item1", "item3", "item5"],
  },
};

function getVisibleItemsPerCustomer(rootCategory, customerVisibilityData) {
  const visibleItemsPerCustomer = {};

  // Iterate over each customer
  Object.keys(customerVisibilityData).forEach((customer) => {
    const visibleCategories =
      customerVisibilityData[customer].visibleCategories;
    const visibleItems = customerVisibilityData[customer].visibleItems;
    visibleItemsPerCustomer[customer] = [];

    function traverseCategory(category) {
      if (rootCategory[category] && rootCategory[category].items) {
        visibleItemsPerCustomer[customer].push(...rootCategory[category].items);
      }

      const subcategories =
        rootCategory[category] && rootCategory[category].subcategories;
      if (subcategories) {
        for (const subcategory in subcategories) {
          traverseCategory(subcategory);
        }
      }
    }

    // Traverse the category tree for each visible category
    visibleCategories.forEach((category) => {
      traverseCategory(category);
    });

    // Filter duplicate items and sort the list
    visibleItemsPerCustomer[customer] = Array.from(
      new Set(visibleItemsPerCustomer[customer])
    ).sort();
  });

  return visibleItemsPerCustomer;
}

const result = getVisibleItemsPerCustomer(categoryTree, customerVisibilityData);
console.log(result);