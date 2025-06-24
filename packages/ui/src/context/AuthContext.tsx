import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
	createContext,
	createEffect,
	createSignal,
	useContext,
} from "solid-js";
import { auth } from "@timelink/utils/firebase";

interface AuthState {
	user: User | null;
	loading: boolean;
	emailVerified: boolean;
}

const AuthContext = createContext<AuthState>({
	user: null,
	loading: true,
	emailVerified: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = createSignal<User | null>(null);
	const [emailVerified, setEmailVerified] = useState(false);
	const [loading, setLoading] = createSignal(true);

	createEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				await firebaseUser.reload();
				setUser(firebaseUser);
				setEmailVerified(firebaseUser.emailVerified);
			} else {
				setUser(null);
				setEmailVerified(false);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, emailVerified }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
