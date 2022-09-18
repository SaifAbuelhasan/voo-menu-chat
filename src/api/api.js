import axios from "axios";

export const domainURL = "http://api4-1-7.vooodelivery.com/";

const api = axios.create({
  baseURL: `${domainURL}api/`,
});

export const login = async (username, password) => {
  const response = await api.post("Accounts/CallCenterEmpLogin", {
    username,
    password,
  });
  return response.data;
};

export const getBranches = async (userId) => {
  const response = await api.get(
    `Branches/GetBranches?userId=${userId}&securityToken=null&Language=EN`
  );
  return response.data.branches;
};
