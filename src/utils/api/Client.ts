export interface ApiResponse<T> {
    data: T | null;
    errorMessages: string[];
}
export class Client {
    static async fetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                // Try to parse server error body
                let errorDetail = "";
                try {
                    const errorData = await response.json();
                    errorDetail = errorData.message || JSON.stringify(errorData);
                } catch {
                    errorDetail = response.statusText;
                }

                return {
                    data: null,
                    errorMessages: [`HTTP ${response.status}: ${errorDetail}`],
                };
            }

            const data: T = await response.json();

            return {
                data,
                errorMessages: [],
            };
        } catch (error) {
            return {
                data: null,
                errorMessages: [(error as Error).message],
            };
        }
    }
}