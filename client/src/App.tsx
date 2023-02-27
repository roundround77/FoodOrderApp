import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STORAGE } from "./constants/storage";
import Router from "./routes";
import { getProfileRequest } from "./services/auth.service";

export type Role = "user" | "admin";
export enum RoleType {
  Admin,
  User
}

interface IProfile {
  _id: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string | null;
}

interface IContextProps {
  profile: IProfile | null;
  verified: boolean;
  token: string;
  role: Role | null;
  setToken: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<Role | null>>;
  setProfile: Dispatch<SetStateAction<IProfile | null>>;
}

export const AuthContext = createContext<IContextProps>({
  verified: false,
  token: "",
  role: null,
  profile: null,
  setToken: () => {},
  setRole: () => {},
  setProfile: () => {}
});

const App: FC = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<Role | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);

    if (storageToken) {
      try {
        (async () => {
          const result = await getProfileRequest();
          if (result.data.success) {
            const { role, ...restProps } = result.data.data;
            setProfile({ ...restProps });
            setToken(storageToken);
            setRole(role ? "user" : "admin");
            setVerified(true);
          } else {
            setVerified(true);
          }
        })();
      } catch (err) {
        console.error(err);
        setVerified(true);
      }
    } else {
      setVerified(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ verified, token, role, profile, setToken, setRole, setProfile }}
    >
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthContext.Provider>
  );
};

export default App;
