import { supabase } from "@/config/supabaseClient"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/

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

