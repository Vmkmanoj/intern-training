import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });