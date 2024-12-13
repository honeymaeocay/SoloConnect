// 👉 Main Navigation; Title, Icon
export const mainNav = [
  ['User Management', 'mdi-account-badge-outline'],
  ['Form', 'mdi-form-select'],
  ['Benefits', 'mdi-list-box-outline'],
  ['About us', 'mdi-account-badge-outline'],
]

// 👉 Sub Navigations; Title, Icon, Subtitle, Redirect Path
export const menuItemsNav1 = [
  ['List of Branches', 'mdi-store', '', '/manage/branches'],
  ['User Roles', 'mdi-tag-multiple', '', '/manage/user/roles'],
  ['Users Management', 'mdi-account-multiple', '', '/manage/users']
]
export const menuItemsNav2 = [
  ['Product Information', 'mdi-information-box', 'Add and Manage Products', '/products']
]
export const menuItemsNav3 = [
  ['Stock In', 'mdi-tray-arrow-down', 'Add Stocks on Products', '/inventory/stockin'],
  ['Stock Weight', 'mdi-weight-kilogram', 'Track Weight of Products', '/inventory/weight'],
  ['Sales', 'mdi-tray-arrow-up', 'Sell Products', '/inventory/sales']
]
export const menuItemsNav4 = [
  ['Expenditures', 'mdi-cash-remove', 'Tally and Manage Expenses', '/expenses']
]
