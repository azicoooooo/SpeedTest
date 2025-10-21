import AppLayout from './components/layout/AppLayout.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';
import AppRoutes from './router/AppRoutes.jsx';

const App = () => {
  return (
    <InventoryProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </InventoryProvider>
  );
};

export default App;
