import React, { createContext, useReducer, useContext, useEffect } from 'react';
import adminApi from '../services/adminApi';

const AdminContext = createContext();

const initialState = {
  isAuthenticated: false,
  admin: null,
  token: localStorage.getItem('adminToken'),
  loading: true,
  error: null,
  services: [],
  careers: [],
  contacts: [],
  settings: {},
  stats: {}
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.admin,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        token: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
        token: null
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_CAREERS':
      return { ...state, careers: action.payload };
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload };
    case 'SET_STATS':
      return { ...state, stats: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const response = await adminApi.verifyToken();
          if (response.success) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { admin: response.admin, token } });
            await fetchDashboardData();
          } else {
            localStorage.removeItem('adminToken');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          localStorage.removeItem('adminToken');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    verifyToken();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [services, careers, contacts, settings, stats] = await Promise.all([
        adminApi.getServices(),
        adminApi.getCareers(),
        adminApi.getContacts(),
        adminApi.getSettings(),
        adminApi.getStats()
      ]);
      
      dispatch({ type: 'SET_SERVICES', payload: services.services });
      dispatch({ type: 'SET_CAREERS', payload: careers.careers });
      dispatch({ type: 'SET_CONTACTS', payload: contacts.contacts });
      dispatch({ type: 'SET_SETTINGS', payload: settings.settings });
      dispatch({ type: 'SET_STATS', payload: stats.stats });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const login = async (username, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await adminApi.login(username, password);
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { admin: response.admin, token: response.token } });
        await fetchDashboardData();
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAIL', payload: response.message });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response?.data?.message || 'Login failed' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    dispatch({ type: 'LOGOUT' });
  };

  const updateServices = async (services) => {
    try {
      const response = await adminApi.updateServices(services);
      if (response.success) {
        dispatch({ type: 'SET_SERVICES', payload: response.services });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return false;
    }
  };

  const updateCareers = async (careers) => {
    try {
      const response = await adminApi.updateCareers(careers);
      if (response.success) {
        dispatch({ type: 'SET_CAREERS', payload: response.careers });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return false;
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      const response = await adminApi.updateContactStatus(id, status);
      if (response.success) {
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return false;
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await adminApi.deleteContact(id);
      if (response.success) {
        await fetchDashboardData();
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return false;
    }
  };

  const updateSettings = async (settings) => {
    try {
      const response = await adminApi.updateSettings(settings);
      if (response.success) {
        dispatch({ type: 'SET_SETTINGS', payload: response.settings });
        return true;
      }
      return false;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{
      ...state,
      login,
      logout,
      updateServices,
      updateCareers,
      updateContactStatus,
      deleteContact,
      updateSettings,
      fetchDashboardData
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};