import { createClient } from '@supabase/supabase-js'
// import { getAvatarText } from './helpers'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

// 👉 Form Action utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: '',
}

// Check if the session is exists and is valid: Return false if there's an error
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session', error.message)
    return false
  }

  return !!data.session
}

// Retrieve User Information
export const getUserInformation = async () => {
  const {
    data: {
      user: {user_metadata}
    }
  } = await supabase.auth.getUser()

  return user_metadata
}


// // Benefits part
// export const fetchBenefits = async () => {
//   const { data, error } = await supabase.from('user_benefits').select('*')
//   if (error) {
//     console.error('Error fetching benefits:', error.message)
//     return []
//   }
//   return data
// }

// export const addBenefit = async (benefit) => {
//   const { data, error } = await supabase.from('user_benefits').insert([benefit])
//   if (error) {
//     console.error('Error adding benefit:', error.message)
//   }
//   return data
// }
