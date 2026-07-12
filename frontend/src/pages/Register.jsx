import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });


    // ==========================
    // Handle Input Change
    // ==========================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    // ==========================
    // Handle Registration
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await register(form);

            toast.success(
                "Account created successfully! Please login."
            );

            navigate("/login");

        }

        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.username?.[0] ||
                error.response?.data?.password?.[0] ||
                "Registration failed."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // Common input styles

    const inputClassName = `
        w-full
        rounded-xl
        border border-slate-300
        bg-slate-50
        p-4
        text-slate-900
        outline-none
        transition-all
        duration-300
        placeholder:text-slate-400

        focus:border-cyan-500
        focus:bg-white
        focus:ring-4
        focus:ring-cyan-500/10

        dark:border-white/10
        dark:bg-[#111113]
        dark:text-white
        dark:placeholder:text-zinc-500

        dark:focus:border-cyan-400
        dark:focus:bg-[#111113]
        dark:focus:ring-cyan-400/10
    `;


    return (

        <section
            className="
                flex min-h-screen
                items-center justify-center
                bg-gradient-to-br
                from-white
                via-slate-50
                to-slate-100
                px-6
                py-12
                transition-colors
                duration-300

                dark:from-[#09090b]
                dark:via-[#0c0c0f]
                dark:to-[#111113]
            "
        >

            {/* Register Card */}

            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border border-slate-200
                    bg-white
                    p-10
                    shadow-xl
                    shadow-slate-200/60
                    transition-colors
                    duration-300

                    dark:border-white/10
                    dark:bg-[#18181b]
                    dark:shadow-2xl
                    dark:shadow-black/30
                "
            >

                {/* Header */}

                <div className="text-center">

                    <div className="text-6xl">
                        🦇
                    </div>

                    <h1
                        className="
                            mt-4
                            text-4xl
                            font-extrabold
                            text-slate-950

                            dark:text-white
                        "
                    >
                        Create Account
                    </h1>

                    <p
                        className="
                            mt-3
                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        Join NightBat AI
                    </p>

                </div>


                {/* Register Form */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    {/* First Name & Last Name */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={form.first_name}
                            onChange={handleChange}
                            autoComplete="given-name"
                            className={inputClassName}
                        />

                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={form.last_name}
                            onChange={handleChange}
                            autoComplete="family-name"
                            className={inputClassName}
                        />

                    </div>


                    {/* Username */}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                        className={inputClassName}
                    />


                    {/* Email */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className={inputClassName}
                    />


                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        className={inputClassName}
                    />


                    {/* Confirm Password */}

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        className={inputClassName}
                    />


                    {/* Create Account Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-cyan-500
                            py-4
                            font-bold
                            text-slate-950
                            shadow-lg
                            shadow-cyan-500/20
                            transition-all
                            duration-300

                            hover:-translate-y-0.5
                            hover:bg-cyan-400
                            hover:shadow-xl
                            hover:shadow-cyan-500/25

                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            disabled:hover:translate-y-0
                        "
                    >

                        {
                            loading
                                ? "Creating Account..."
                                : "Create Account"
                        }

                    </button>

                </form>


                {/* Login Link */}

                <p
                    className="
                        mt-8
                        text-center
                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            font-semibold
                            text-cyan-600
                            transition
                            hover:text-cyan-500

                            dark:text-cyan-400
                            dark:hover:text-cyan-300
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </section>

    );

}

export default Register;