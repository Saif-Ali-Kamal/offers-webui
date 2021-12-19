export const categoryOptions = [
  { value: 'art & entertainment', label: 'Art & Entertainment' },
  { value: 'babby, kids & toddlers', label: 'Babby, Kids & Toddlers' },
  { value: 'books & educational', label: 'Books & Educational' },
  { value: 'business & industrial', label: 'business & Industrial' },
  { value: 'electricals & accessories', label: 'Electricals & Accessories' },
  { value: 'electronics & accessories', label: 'Electronics & Accessories' },
  { value: 'fashion, accessories & lifestyle', label: 'Fashion, Accessories & Lifestyle' },
  { value: 'food, beverage & dining', label: 'Food, Beverage & Dinning' },
  { value: 'furniture', label: 'Furniture'},
  { value: 'gifts & flowers', label: 'Gifts & Flowers' },
  { value: 'health & beauty', label: 'Heath & Beauty' },
  { value: 'home & garden decor', label: 'Home & Garden Decor' },
  { value: 'home & kitchen appliances', label: 'Home & Kitchen Appliances' },
  { value: 'luggage & bags', label: 'Luggage & Bags' },
  { value: 'office & school supplies', label: 'Office & School Supplies' },
  { value: 'recharge,  transfer & bill payment', label: 'Recharge, Transfer & Bill Payment',
  children: [
    { value: 'recharge', label: 'Recharge' },
    { value: 'bill payment', label: 'Bill Payment' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'others', label: 'Others' }
  ]},
  { value: 'software, domain & hosting', label: 'Software, Domain & Hosting',  
  children: [
    { value: 'software', label: 'Software' },
    { value: 'website', label: 'Website' },
    { value: 'domain', label: 'Domain' },
    { value: 'hosting', label: 'Hosting' },
    { value: 'others', label: 'Others' }
  ]},
  { value: 'sports & fitness', label: 'Sports & Fitness', 
  children: [
    { value: 'sports', label: 'Sports' }, 
    { value: 'fitness', label: 'Fitness' }, 
    { value: 'others', label: 'Others' }, 
  ]},
  { value: 'travel & tourism', label: 'Travel & Tourism', 
  children: [
    { value: 'travel', label: 'Travel' }, 
    { value: 'tourism', label: 'Tourism' }, 
    { value: 'others', label: 'Others' }, 
  ]},
  { value: 'tools & equipments', label: 'Tools & Equipments', 
  children: [
    { value: 'tools', label: 'Tools' }, 
    { value: 'equipments', label: 'Equipments' }, 
    { value: 'others', label: 'Others' } 
  ]},
  { value: 'toys & games', label: 'Toys & Games', 
  children: [
    { value: 'toys', label: 'Toys' }, 
    { value: 'games', label: 'Games' }, 
    { value: 'others', label: 'Others' }
  ]},
  { value: 'vehicle & accessories', label: 'Vehicle & Accessories', 
  children: [
    { value: 'vehicle', label: 'Vehicle' }, 
    { value: 'accessories', label: 'Accessories' }, 
    { value: 'others', label: 'Others' }
  ]},
  { value: 'others', label: 'Others', 
  children: [
    { value: 'others', label: 'Others' }, 
  ]},
]

export const roles = {
  superAdmin: 'SUPER_ADMIN',
  admin: 'ADMIN',
  user: 'USER'
}

export const loading = 'LOADING';

export const success = 'SUCCESS';

export const failed = 'FAILED';