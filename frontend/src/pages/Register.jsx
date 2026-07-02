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

            await register(form);

            toast.success("Account created successfully! Please login.");

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

    return (

        <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6">

            <div className="w-full max-w-lg rounded-3xl border border-cyan-500/20 bg-white/5 p-10 shadow-2xl backdrop-blur">

                <div className="text-center">

                    <div className="text-6xl">

                        🦇

                    </div>

                    <h1 className="mt-4 text-4xl font-extrabold text-white">

                        Create Account

                    </h1>

                    <p className="mt-3 text-gray-400">

                        Join NightBat AI

                    </p>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="mt-8 space-y-5"

                >

                    <div className="grid grid-cols-2 gap-4">

                        <input

                            type="text"

                            name="first_name"

                            placeholder="First Name"

                            value={form.first_name}

                            onChange={handleChange}

                            className="rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none"

                        />

                        <input

                            type="text"

                            name="last_name"

                            placeholder="Last Name"

                            value={form.last_name}

                            onChange={handleChange}

                            className="rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none"

                        />

                    </div>

                    <input

                        type="text"

                        name="username"

                        placeholder="Username"

                        value={form.username}

                        onChange={handleChange}

                        required

                        className="w-full rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none"

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={form.email}

                        onChange={handleChange}

                        required

                        className="w-full rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={form.password}

                        onChange={handleChange}

                        required

                        className="w-full rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none"

                    />

                    <input

                        type="password"

                        name="confirm_password"

                        placeholder="Confirm Password"

                        value={form.confirm_password}

                        onChange={handleChange}

                        required

                        className="w-full rounded-xl border border-cyan-500/20 bg-gray-900 p-4 text-white outline-none"

                    />

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full rounded-xl bg-cyan-500 py-4 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-60"

                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Create Account"

                        }

                    </button>

                </form>

                <p className="mt-8 text-center text-gray-400">

                    Already have an account?{" "}

                    <Link

                        to="/login"

                        className="font-semibold text-cyan-400"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </section>

    );

}

export default Register;