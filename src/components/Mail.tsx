import { Send } from "lucide-react"

const Mail = () => {
  return (
    <div className="bg-gradient-to-br from-lime-100 to-green-300 min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[75vh] rounded-2xl overflow-hidden bg-slate-700/30 flex shadow-2xl">
        {/* Left Side - Sports Image */}
        <div className="w-1/3 h-full relative hidden md:block">
          <img src="https://images.unsplash.com/photo-1547941126-3d5322b218b0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNwb3J0fGVufDB8fDB8fHww" alt="Sports" className="object-cover h-full w-full" />
          <div className="absolute inset-0 bg-lime-800/50 flex flex-col items-center justify-end p-8">
            <h1 className="text-white text-6xl font-bold mb-2">Become a Host</h1>
            <p className="text-white/80 text-left text-lg">Be the part of a thrilling sports platform</p>
          </div>
        </div>

        {/* Right Side - Glassmorphism Section */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-white bg-gray-100/70">
          {/* Welcome Text */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4 ">
              
            </div>
            <h2 className="text-3xl font-bold mb-2 text-black/80">Welcome!</h2>
            <p className="text-sm text-black/80">
              Thank you for showing interest in our platform. Please share your details below.
            </p>
          </div>

          {/* Glassmorphism Form */}
          <form
            className="flex flex-col gap-6 w-full max-w-md p-8 rounded-xl 
            bg-gray-100/20 backdrop-blur-none border border-gray-500/25 text-white shadow-xl"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-700/80 font-medium block">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/20 border-2 border-gray-600/45 rounded-lg p-2.5 text-gray-800/70  placeholder:text-gray-700/45 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-gray-700/80 font-medium block">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write your message..."
                className="w-full bg-white/20 border-2 border-gray-600/45 rounded-lg p-2.5 min-h-[150px] text-gray-800/70 placeholder:text-gray-700/45 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2  transition-all duration-300 hover:scale-105"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Mail
