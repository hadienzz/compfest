import usePauseSubs from "./usePauseSubs"
import { useFormik } from "formik"

const useSelectDate = (id) => {
    const { mutate } = usePauseSubs()
    const formik = useFormik({
        initialValues: {
            date: ''
        },
        onSubmit: (body) => {
            const { date } = body
            mutate({ date, id })
            formik.resetForm()
        },

    })
    return {
        formik
    }
}

export default useSelectDate