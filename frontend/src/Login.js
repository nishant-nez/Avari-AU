import React, { useState } from "react"
import axios from './api/axios'

const Form = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        alert("You are Signed In")
        try {
            await axios.post(`/api/signin`, {
                email, password
            })
        } catch (e) {
            if (e.res.message) {
                setError(e.res.message)
            }
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="bg-[#0e387a] h-screen mx-auto'">
            <h1 className='text-center text-3xl text-[#9fafca] hover:text-[#b8df10] font-extrabold pt-10 pb-10'>Sign In Form</h1>
            { error ? (<div>{ error }</div>) : ('') }
            <form className="max-w-sm mx-auto w-full" onSubmit={ handleSubmit }>
                <div className="flex flex-col pt-10">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input type="text" className="border-none mb-3 rounded-md" onChange={ e => setEmail(e.target.value) } value={ email } />
                    <label htmlFor="password" className="text-white">Password</label>
                    <div className="relative">
                        <input type={ showPassword ? "text" : "password" } className="rounded-md border-none pr-48" onChange={ e => setPassword(e.target.value) } value={ password } />
                        <button type="button" className="absolute inset-y-0 right-0 pr-2 flex items-center" onClick={ toggleShowPassword }> { showPassword ? <i className="fas fa-eye-slash fa-2x"></i> : <i className="fas fa-eye fa-2x"></i> } </button>
                    </div>
                    <button type="submit" className="rounded-full text-lg leading-4 font-medium bg-blue-500 hover:bg-sky-700 h-8 mt-5 text-white" onClick={ handleSubmit }>Sign In</button>
                </div>
            </form>
        </div>
    )
}
export default Form