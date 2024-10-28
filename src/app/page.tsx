import AppProvider from "@/context/AppProvider";
import ConnectSolana from "@/app/connectSolana";
import SignIn from "@/app/signIn";
import AccountInfo from "@/app/accountInfo";
import Deposit from "@/app/deposit";

export default function Home() {
  return (
      <AppProvider>
          <div className="px-5 py-3">
              <ConnectSolana/>
              {/*<ConnectEvm/>*/}
          </div>
          <div className="px-5 py-3">
              <SignIn/>
          </div>
          <div className="px-5 py-3">
              <AccountInfo/>
          </div>

          <div className="px-5 py-3">
              <Deposit/>
          </div>

      </AppProvider>
);
}
