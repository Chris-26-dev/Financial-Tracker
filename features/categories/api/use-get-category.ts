import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

//This is Hook and type safety
export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["category", { id }],
        queryFn: async () => {
            const response = await client.api.categories[":id"].$get({
                param: { id },
            });

            if (!response.ok){
                throw new Error("Failed to fetch category");
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
};