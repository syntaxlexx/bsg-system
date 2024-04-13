import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const UNAUTHENTICATED_STATUS_CODE = 401;
export const UNAUTHORIZED_STATUS_CODE = 403;

export function isAuthError(code: number) {
  return [UNAUTHENTICATED_STATUS_CODE, UNAUTHORIZED_STATUS_CODE].includes(code)
}

export function unauthenticatedResponse(message = 'Unauthenticated') {
  return new Response(JSON.stringify({
    message,
  }), { status: UNAUTHENTICATED_STATUS_CODE })
}

export function unauthorizedResponse(message = 'Unauthorized') {
  return new Response(JSON.stringify({
    message,
  }), { status: UNAUTHORIZED_STATUS_CODE })
}

export function resourceNotFound(message = 'Resource not found') {
  return new Response(JSON.stringify({
    message,
  }), { status: 404 })
}

export function successResponse(message = 'OK', code = 200) {
  return new Response(JSON.stringify({
    message,
  }), { status: code })
}

export function errorResponse(message = 'Could not process request', code = 500) {
  return new Response(JSON.stringify({
    message,
  }), { status: code })
}

export function validationErrorResponse(message = 'Invalid request data passed!', code = 422) {
  return new Response(JSON.stringify({
    message,
  }), { status: code })
}

export function badRequestResponse(message = 'A similar resource exists!', code = 409) {
  return new Response(JSON.stringify({
    message,
  }), { status: code })
}
