import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);


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
    // Handle Login
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await login(
                form.username,
                form.password
            );

            toast.success("Welcome back!");

            navigate("/");

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Invalid username or password."
            );

        }

        finally {

            setLoading(false);

        }

    };


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

            {/* Login Card */}

            <div
                className="
                    w-full
                    max-w-md
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
                        NightBat AI
                    </h1>

                    <p
                        className="
                            mt-3
                            text-slate-600

                            dark:text-zinc-400
                        "
                    >
                        Welcome back!
                    </p>

                </div>


                {/* Login Form */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-5"
                >

                    {/* Username */}

                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        autoComplete="username"
                        className="
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
                        "
                    />


                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                        className="
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
                        "
                    />


                    {/* Login Button */}

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
                                ? "Signing In..."
                                : "Login"
                        }

                    </button>

                </form>


                {/* Register Link */}

                <p
                    className="
                        mt-8
                        text-center
                        text-slate-600

                        dark:text-zinc-400
                    "
                >

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                            font-semibold
                            text-cyan-600
                            transition
                            hover:text-cyan-500

                            dark:text-cyan-400
                            dark:hover:text-cyan-300
                        "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </section>

    );

}

export default Login;