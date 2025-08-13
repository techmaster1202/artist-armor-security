import { IMAGES } from "../../assets";
import Loader1 from "../../common/Loader";
import { useAuth } from "../../hooks/use-auth";
import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  const { loading, handleLogin } = useAuth();

  return (
    <div>
      {loading && (
        <div className="fixed right-1/2 top-1/2 z-[100]">
          <Loader1 />
        </div>
      )}

      <section className={`dark:bg-gray-900 ${loading && "opacity-50"}`}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 shadow">
          <div className="flex w-full items-center justify-center">
            <div className="w-full flex justify-center">
              <div className="w-full bg-gradient-to-r text-white from-blue-500 to-cyan-400 dark:from-gray-00 dark:to-gray-600 hidden md:block rounded-l-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                <div className="flex items-center justify-center p-8">
                  <img src={IMAGES.coopLogoNoBg} alt="logo" width={120} />
                </div>
                <div className="flex-1 items-center  justify-center text-2xl font-bold px-16 py-3">
                  <span>Artist Armor Marketplace</span>
                </div>
              </div>
              <div className="w-full rounded-r-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center">
                  {/* <img src={IMAGES.cmsLogo} alt="logo" width={175} /> */}
                </div>
                <div className="space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <LoginForm onSubmit={handleLogin} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
