import { useState, useEffect, useCallback } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

// Define the shape of the network status
interface NetworkStatus {
  isConnected: boolean | null; // null while initial state is loading
  isInternetReachable: boolean | null; // Whether the internet is reachable
  type: NetInfoState["type"] | null; // Type of connection (wifi, cellular, etc.)
  details: NetInfoState["details"] | null; // Additional connection details
  loading: boolean; // Loading state
  retryConnection: () => Promise<void>; // Function to retry connection
  lastChecked: Date | null; // Last time the connection was checked
}

const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<Omit<NetworkStatus, 'retryConnection'>>({
    isConnected: null,
    isInternetReachable: null,
    type: null,
    details: null,
    loading: true, // Initially loading
    lastChecked: null, // Initially no check has been performed
  });

  // Function to check network status
  const checkNetworkStatus = useCallback(async () => {
    try {
      setNetworkStatus(prev => ({ ...prev, loading: true }));
      const state = await NetInfo.fetch();
      setNetworkStatus({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details,
        loading: false, // Done loading after fetch
        lastChecked: new Date(), // Update last checked timestamp
      });
      return state;
    } catch (error) {
      console.error('Error checking network status:', error);
      setNetworkStatus(prev => ({
        ...prev,
        loading: false,
        lastChecked: new Date(), // Update last checked timestamp even on error
      }));
      throw error;
    }
  }, []);

  // Function to retry connection
  const retryConnection = useCallback(async () => {
    try {
      const state = await checkNetworkStatus();
      if (state.isConnected && state.isInternetReachable) {
        Toast.show({
          type: 'success',
          text1: 'Connected',
          text2: 'Your device is now connected to the internet',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'No Connection',
          text2: 'Please check your internet connection and try again',
          position: 'bottom',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Connection Error',
        text2: 'Failed to check network status',
        position: 'bottom',
      });
    }
  }, [checkNetworkStatus]);

  useEffect(() => {
    // Fetch initial network state
    checkNetworkStatus();

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus(prev => ({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        details: state.details,
        loading: false, // Ensure loading is false after updates
        lastChecked: new Date(), // Update last checked timestamp
      }));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return network status with retry function
  return {
    ...networkStatus,
    retryConnection,
  };
};

export default useNetworkStatus;
