import AppRoutes from './router/AppRoutes.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';

const App = () => {
  return (
    <InventoryProvider>
      <AppRoutes />
    </InventoryProvider>
  );
};

export default App;
