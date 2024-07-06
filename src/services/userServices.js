import axios from "axios";
import {
  BASE_URL,
  CREATETASK_API,
  DELETE_API,
  GETTASK_API,
  LOGIN_API,
  SIGNUP_API,
  TOGGLE_API,
  USERDATA_API,
} from "./api";

// API for user login
export const userLogin = async (userName, password) => {
  try {
    const response = await axios.post(`${LOGIN_API}`, {
      userName,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error while logging in", error);
  }
};

// API for user signup
export const userSignup = async (userData) => {
  const { userName, password, phoneNumber, email, fullName } = userData;

  try {
    const response = await axios.post(`${SIGNUP_API}`, {
      userName,
      password,
      fullName,
      phoneNumber,
      email,
    });
    return response;
  } catch (error) {
    return { error: "Username already exists" };
  }
};

// Get task details
export const getTasks = (token) => {
  return axios.get(`${GETTASK_API}`, {
    headers: { Authorization: `${token}` },
  });
};

// Get user details
export const getUserDetails = async (token) => {
  try {
    if (!token) {
      return { error: "No token from the client.." };
    }
    const response = await axios.get(`${USERDATA_API}`, {
      headers: { Authorization: `${token}` },
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Api for creating task
export const CreateTask = async (taskData, token) => {
  if (!token) {
    return { error: "No token from the client." };
  }
  try {
    const response = await axios.post(
      `${CREATETASK_API}`,
      { taskData },
      {
        headers: { Authorization: `${token}` },
      }
    );

    console.log("Task created successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error creating Task",
      error.response ? error.response.data : error.message
    );
    return { error: error.response ? error.response.data : error.message };
  }
};

// Api for updating task
export const UpdateTask = (taskId, taskData, token) => {
  return axios.put(
    `${BASE_URL}/task/${taskId}`,
    { taskData },
    {
      headers: {
        Authorization: ` ${token}`,
      },
    }
  );
};

export const deleteTask = (taskId, token) => {
  return axios.delete(
    DELETE_API,
    {
      taskId , 
      headers: {
        Authorization: `${token}`, // Correctly format the Authorization header
      },
    }
  );
};

// APi for deeleting completed tasks
export const deleteCompletedTasks = (token) => {
  return axios.delete(`${BASE_URL}/deleteCompletedTasks`, {
    headers: {
      Authorization: `${token}`,
    },
  });
};

// Api fro updating task status
export const toggleTaskStatus = (taskId, token) => {
  return axios.put(
    `${BASE_URL}/toggle/${taskId}`,
    {},
    {
      headers: {
        Authorization: ` ${token}`,
      },
    }
  );
};
