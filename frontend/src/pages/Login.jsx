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

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

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

            toast.error("Invalid username or password.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6">

            <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/5 p-10 shadow-2xl backdrop-blur">

                <div className="text-center">

                    <div className="text-6xl">

                        🦇

                    </div>

                    <h1 className="mt-4 text-4xl font-extrabold text-white">

                        NightBat AI

                    </h1>

                    <p className="mt-3 text-gray-400">

                        Welcome back!

                    </p>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="mt-10 space-y-5"

                >

                    <input

                        type="text"

                        name="username"

                        value={form.username}

                        onChange={handleChange}

                        placeholder="Username"

                        required

                        className="w-full rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none focus:border-cyan-400"

                    />

                    <input

                        type="password"

                        name="password"

                        value={form.password}

                        onChange={handleChange}

                        placeholder="Password"

                        required

                        className="w-full rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none focus:border-cyan-400"

                    />

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-60"

                    >

                        {

                            loading

                                ? "Signing In..."

                                : "Login"

                        }

                    </button>

                </form>

                <p className="mt-8 text-center text-gray-400">

                    Don't have an account?{" "}

                    <Link

                        to="/register"

                        className="font-semibold text-cyan-400"

                    >

                        Register

                    </Link>

                </p>

            </div>

        </section>

    );

}

export default Login;