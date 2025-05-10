import api from "@/lib/api";
import { useUserStore } from "@/routes/~_authenticated/store";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export default function useUser() {
  const queryClient = useQueryClient();
  const { setUserData } = useUserStore();

  const useLogin = () => {
    return useMutation({
      mutationFn: async (data: { email: string; password: string }) => {
        const res = await api.post(`/login`, data);
        return res;
      },
      mutationKey: ["login"],
    });
  };

  const useSignUp = () => {
    return useMutation({
      mutationFn: async (data: {
        name: string;
        email: string;
        password: string;
      }) => {
        const res = await api.post(`/signup`, data);
        return res;
      },
      mutationKey: ["signup"],
    });
  };

  const useGetUserDetails = (userId: string) => {
    return useSuspenseQuery({
      queryFn: async () => {
        const { data } = await api.get(`/user-details/${userId}`);

        if (data.status === "Success") {
          setUserData(data.user);
        }
        return data;
      },
      queryKey: ["get-user-details", userId],
      refetchOnMount: true,
    });
  };

  const useUserDetailsUpdate = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.patch(`/update-user/${userId}`, data);
        return res;
      },
      mutationKey: ["update-personal-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };

  const useUserSkillsAdded = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.post(`/add-skill/${userId}`, data);
        return res;
      },
      mutationKey: ["added-skills-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };

  const useUserSkillsUpdates = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.patch(
          `/update-skill/${userId}/${data.uuid}`,
          data
        );
        return res;
      },
      mutationKey: ["update-skills-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };

  const useUserProjectAdded = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.post(`/add-project/${userId}`, data);
        return res;
      },
      mutationKey: ["added-projects-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };

  const useUserProjectsUpdates = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.patch(
          `/update-project/${userId}/${data.uuid}`,
          data
        );
        return res;
      },
      mutationKey: ["update-projects-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };
  const useUserBlogAdded = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.post(`/add-blog/${userId}`, data);
        return res;
      },
      mutationKey: ["added-blog-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };

  const useUserBlogsUpdates = () => {
    return useMutation({
      mutationFn: async ({ data, userId }: { data: any; userId: string }) => {
        const res = await api.patch(
          `/update-blog/${userId}/${data.uuid}`,
          data
        );
        return res;
      },
      mutationKey: ["update-blogs-info"],
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-user-details"],
        });
      },
    });
  };
  return {
    useLogin,
    useSignUp,

    useGetUserDetails,

    useUserDetailsUpdate,

    useUserSkillsAdded,
    useUserSkillsUpdates,

    useUserProjectAdded,
    useUserProjectsUpdates,

    useUserBlogAdded,
    useUserBlogsUpdates,
  };
}
