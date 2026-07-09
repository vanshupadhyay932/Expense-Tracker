import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppRoutes />
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;