import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import dayjs from 'dayjs';

import { inventoryApi } from '../api/inventory.js';
import { seedAssets, seedMaintenance, seedRequests, seedVendors } from '../data/seed.js';

const InventoryContext = createContext();

const initialState = {
  assets: [],
  maintenance: [],
  requests: [],
  vendors: [],
  filters: {
    search: '',
    status: 'Todos',
    category: 'Todos'
  },
  loading: false,
  error: null,
  lastSync: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'SET_LAST_SYNC':
      return {
        ...state,
        lastSync: action.payload
      };
    default:
      return state;
  }
};

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const hydrateFromSeeds = useCallback(() => {
    dispatch({
      type: 'SET_DATA',
      payload: {
        assets: seedAssets,
        maintenance: seedMaintenance,
        requests: seedRequests,
        vendors: seedVendors
      }
    });
    dispatch({ type: 'SET_LAST_SYNC', payload: dayjs().toISOString() });
  }, []);

  const refreshFromApi = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await inventoryApi.bootstrap({
        assets: seedAssets,
        maintenance: seedMaintenance,
        requests: seedRequests,
        vendors: seedVendors
      });

      dispatch({
        type: 'SET_DATA',
        payload: data
      });
      dispatch({ type: 'SET_LAST_SYNC', payload: dayjs().toISOString() });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      console.error('[Inventory] Error fetching data', error);
      dispatch({
        type: 'SET_ERROR',
        payload: 'No se pudo sincronizar con el servidor Django.'
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  useEffect(() => {
    hydrateFromSeeds();
    if (import.meta.env.VITE_API_BASE_URL) {
      refreshFromApi();
    }
  }, [hydrateFromSeeds, refreshFromApi]);

  const setFilters = useCallback((payload) => {
    dispatch({ type: 'SET_FILTERS', payload });
  }, []);

  const filteredAssets = useMemo(() => {
    return state.assets.filter((asset) => {
      const matchesSearch = state.filters.search
        ? [asset.name, asset.id, asset.serial, asset.assignedTo]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(state.filters.search.toLowerCase()))
        : true;
      const matchesStatus =
        state.filters.status === 'Todos' || asset.status === state.filters.status;
      const matchesCategory =
        state.filters.category === 'Todos' || asset.category === state.filters.category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [state.assets, state.filters]);

  const assetStats = useMemo(() => {
    const total = state.assets.length;
    const inUse = state.assets.filter((asset) => asset.status === 'En uso' || asset.status === 'En producción').length;
    const available = state.assets.filter((asset) => asset.status === 'Disponible').length;
    const maintenance = state.assets.filter((asset) => asset.status === 'Mantenimiento').length;
    const totalValue = state.assets.reduce((acc, asset) => acc + (asset.cost || 0), 0);

    const expiringWarranties = state.assets.filter((asset) => {
      const diff = dayjs(asset.warrantyEnd).diff(dayjs(), 'day');
      return diff >= 0 && diff <= 90;
    }).length;

    return {
      total,
      inUse,
      available,
      maintenance,
      totalValue,
      expiringWarranties
    };
  }, [state.assets]);

  const maintenanceByStatus = useMemo(() => {
    return state.maintenance.reduce(
      (acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      {}
    );
  }, [state.maintenance]);

  const requestsByStatus = useMemo(() => {
    return state.requests.reduce(
      (acc, request) => {
        acc[request.status] = (acc[request.status] || 0) + 1;
        return acc;
      },
      {}
    );
  }, [state.requests]);

  const value = useMemo(
    () => ({
      ...state,
      assets: filteredAssets,
      allAssets: state.assets,
      stats: assetStats,
      maintenanceByStatus,
      requestsByStatus,
      setFilters,
      refreshFromApi
    }),
    [
      state,
      filteredAssets,
      assetStats,
      maintenanceByStatus,
      requestsByStatus,
      setFilters,
      refreshFromApi
    ]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventoryContext debe usarse dentro de InventoryProvider');
  }
  return context;
};
