import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onCloseApp = () => {
  window.ipcRenderer.send("closeApp");
};

export const fetchUserProfile = async (clerkid: string) => {
  const response = await httpClient.get(`auth/${clerkid}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getMediaResources = async () => {
  const displays = await window.ipcRenderer.invoke("getSources");
  const enumerateDevices =
    await window.navigator.mediaDevices.enumerateDevices();
  const audioInputs = enumerateDevices.filter(
    (device) => device.kind === "audioinput"
  );

  console.log("getting sources");
  return { displays, audio: audioInputs };
};

export const updateStudioSettings = async (
  screen: string,
  id: string,
  audio: string,
  preset: "HD" | "SD"
) => {
  const response = await httpClient.post(
    `/studio/${id}`,
    {
      screen,
      audio,
      preset,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};
