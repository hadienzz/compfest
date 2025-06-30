import { supabase } from "@/config/supabaseClient"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"


export const useSignUp = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { resetForm }) => {
            const { email, password } = values
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })

            if (error) {
                alert('Failed to signup!')
                console.log(error)
                return
            }

            navigate('/signin')
            resetForm()
        },

    })

    return {
        formik
    }
}

export const useSignIn = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const { email, password } = values
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: {
                    emailRedirectTo: '/'
                }
            })

            if (error) {
                alert('Failed to login')
                console.log(error)
                return
            }

            localStorage.setItem('token', data.session.access_token)

            navigate('/')
            return data
        }
    })

    return {
        formik
    }
}

export const useLogOut = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = async () => {
        if (token) {
            localStorage.removeItem('token')
            const { error } = await supabase.auth.signOut()

            if (error) {
                console.error('Failed to sign out', error)
                return
            }
            navigate('/signin')

        } else {
            navigate('/signin')
        }
    }

    return {
        handleLogout
    }
}   