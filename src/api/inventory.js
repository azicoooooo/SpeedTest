import { apiClient, apiUtils } from './client';

const endpoints = {
  assets: '/inventario/activos/',
  maintenance: '/inventario/mantenimientos/',
  requests: '/inventario/solicitudes/',
  vendors: '/inventario/proveedores/'
};

const listAssets = async (params = {}) => {
  const { data } = await apiClient.get(endpoints.assets, { params });
  return data;
};

const getAsset = async (assetId) => {
  const { data } = await apiClient.get(`${endpoints.assets}${assetId}/`);
  return data;
};

const createAsset = async (payload) => {
  const { data } = await apiClient.post(endpoints.assets, payload);
  return data;
};

const updateAsset = async (assetId, payload) => {
  const { data } = await apiClient.put(`${endpoints.assets}${assetId}/`, payload);
  return data;
};

const retireAsset = async (assetId, payload) => {
  const { data } = await apiClient.post(`${endpoints.assets}${assetId}/retirar/`, payload);
  return data;
};

const listMaintenance = async (params = {}) => {
  const { data } = await apiClient.get(endpoints.maintenance, { params });
  return data;
};

const listRequests = async (params = {}) => {
  const { data } = await apiClient.get(endpoints.requests, { params });
  return data;
};

const listVendors = async (params = {}) => {
  const { data } = await apiClient.get(endpoints.vendors, { params });
  return data;
};

const bootstrap = async (fallbacks = {}) => {
  if (!apiUtils.hasCustomBaseUrl) {
    return {
      assets: fallbacks.assets,
      maintenance: fallbacks.maintenance,
      requests: fallbacks.requests,
      vendors: fallbacks.vendors
    };
  }

  const [assets, maintenance, requests, vendors] = await Promise.all([
    listAssets(),
    listMaintenance(),
    listRequests(),
    listVendors()
  ]);

  return { assets, maintenance, requests, vendors };
};

export const inventoryApi = {
  endpoints,
  listAssets,
  getAsset,
  createAsset,
  updateAsset,
  retireAsset,
  listMaintenance,
  listRequests,
  listVendors,
  bootstrap
};
