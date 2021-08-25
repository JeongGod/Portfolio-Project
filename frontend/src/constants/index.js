import { ACCOUNT_NAME, KEY } from "constants/azure_key";

export const API_BASE_URL = "http://localhost:5000";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const INITIAL_TOKEN = "INITIAL_TOKEN";

export const STORAGE_ACCOUNT_NAME = process.env.storageresourcename || ACCOUNT_NAME;
export const SAS_TOKEN = process.env.storagesastoken || KEY;
export const CONTAINER_NAME = 'profile-image';