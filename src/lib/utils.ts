import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLocal(): boolean {
	return (
		window.location.hostname === "localhost" && window.location.port === "3000"
	)
}