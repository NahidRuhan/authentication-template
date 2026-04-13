import { sendEmailVerification, updateProfile } from "firebase/auth";
// import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link } from "react-router";
// import { auth } from "./firebase.init";
import { AuthContext } from "./contexts/AuthContext";

const EmailRegister = () => {
  const [username, setUsername] = useState('');
  const [photo, setPhotoUrl] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success,setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const {createUser} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')
    setSuccess(false)

  const passChecker = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|`~]).{7,}$/
    if(!passChecker.test(password)){
      setError('Password must contain blah blah blah')
      return
    }

    if(!e.target.terms.checked){
      setError("Please accept our terms and condition")
    }

    createUser(email,password)
    .then(res=>{
      console.log(res.user)
      setSuccess(true)
      e.target.reset()
      const profile = {
        displayName: username,
        photoURL: photo
      }
      updateProfile(res.user,profile)
      sendEmailVerification(res.user).then(()=>alert('Please verify your email address'))
    })
    .catch(error => setError(error.message))
  };

  // without using AuthContext
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setError('')
  //   setSuccess(false)

  // const passChecker = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|`~]).{7,}$/
  //   if(!passChecker.test(password)){
  //     setError('Password must contain blah blah blah')
  //     return
  //   }

  //   if(!e.target.terms.checked){
  //     setError("Please accept our terms and condition")
  //   }

  //   createUserWithEmailAndPassword(auth,email,password)
  //   .then(res=>{
  //     console.log(res.user)
  //     setSuccess(true)
  //     e.target.reset()
  //     const profile = {
  //       displayName: username,
  //       photoURL: photo
  //     }
  //     updateProfile(res.user,profile)
  //     sendEmailVerification(res.user).then(()=>alert('Please verify your email address'))
  //   })
  //   .catch(error => setError(error.message))
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-500 text-sm">Enter your details to get started</p>
        </div>

        {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Username Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-gray-50 focus:bg-white"
            required
          />
        </div>

        {/* Photo URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="photo">
            Photo URL
          </label>
          <input
            id="photo"
            type="url"
            value={photo}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
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
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-gray-50 focus:bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye off icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="checkbox" name="terms" required />
          <p>Accept our term and condition</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors mt-2 active:scale-[0.98]"
        >
          Register
        </button>
      </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Login now
          </Link>
        </p>
        {success && <p className="text-center text-green-500">Account Created Successfully</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

      </div>
    </div>
  );
};

export default EmailRegister;