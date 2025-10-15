import guitar from '../assets/guitar.png'
import phone from '../assets/phone.png'
import google from '../assets/google.png'
import { auth } from "../firebase/setup"
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';



const Login = ({ setLoginPop }: { setLoginPop: boolean }) => {

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    console.log('User signed in with Google!');
  } catch (error) {
    console.error('Error during Google sign-in:', error);
  }
};




  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-zinc-950/85 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div onClick={() => setLoginPop(false)} className="flex justify-end cursor-pointer font-semibold text-3xl">
                <svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
                  <path className="" d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path>
                </svg>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <img src={guitar} className="w-20 h-20 ml-32" />
                    <p className="text-base font-medium mt-5 text-center">Help us to become one of the safest places<br /> to buy and sell</p>
                    <div className="flex border-2 border-black p-2 rounded-md mt-12 cursor-pointer">
                      <img src={phone} className="w-6 h-6" />
                      <h1 className="font-semibold ml-3">Continue with phone</h1>
                    </div>
                    <div onClick={handleGoogleSignIn} className="flex border border-gray-300 p-2 rounded-md mt-4 cursor-pointer">
                      <img src={google} className="w-6 h-6" />
                      <h1 className="font-semibold ml-12">Continue with Google</h1>
                    </div>
                    <h1 className="text-center mt-4 cursor-pointer">OR</h1>
                    <h1 className="text-center mt-4 underline cursor-pointer">Login with Email</h1>
                    <h1 className="text-center mt-28 text-xs">All your personal details are safe with us.</h1>
                    <h1 className="text-center mt-4 text-xs">If you continue, you are accepting <span className="text-blue-600">OLX Terms and <br />Conditions and Privacy Policy</span></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Login
