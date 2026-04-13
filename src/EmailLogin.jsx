import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "./firebase.init";

const EmailLogin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef()


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')

    signInWithEmailAndPassword(auth,email,password)
    .then(res=>{
        console.log(res.user)
        if(!res.user.emailVerified){
            alert('Please verify your email address')
            return
        }
        setUser(res.user)
    })
    .catch(error=>setError(error.message))

  };

  const handleForget = () => {
    const refEmail = emailRef.current.value
    sendPasswordResetEmail(auth,refEmail).then(()=>alert('Please check email'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-gray-50 focus:bg-white"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              onClick={handleForget} 
              type="button" 
              className="text-sm text-gray-600 hover:text-black hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors mt-2 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/email" className="text-black font-semibold hover:underline">
            Register now
          </Link>
        </p>

              {user && (
        <div className="flex flex-col items-center text-center mt-4">
          <img className="rounded-full w-20 h-20 mb-2" src={user.photoURL} alt="User Profile" />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <h2 className="text-gray-600">{user.email}</h2>
        </div>
      )}

        {error && <p className="text-center text-red-500">{error}</p>}
        {/* {user && <h2 className="text-center text-gray-600">{user.email}</h2>} */}

      </div>

    </div>
  );
};

export default EmailLogin;