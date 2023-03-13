import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
  const userData = useSelector((state) => state.userData.value);

  return { userData };
}
