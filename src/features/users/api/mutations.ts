import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/core/api'

import { userKeys } from './queries'

import type { CreateUserDTO, UpdateUserDTO, User } from '../types'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateUserDTO) => {
      const response = await apiClient.post<User>('/users', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateUserDTO) => {
      const response = await apiClient.patch<User>(`/users/${id}`, data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.detail(id), data)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/users/${id}`)
      return id
    },
    onSuccess: (id) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
