'use server'


const BASE_URL = 'http://localhost:3333';

export async function api<T>(path: string, options?: RequestInit ): Promise<T | null> {
    try{
        const response = await fetch(`${BASE_URL}/${path}`, options);
        console.log(`${BASE_URL}/${path}`);
        console.log(response);
        if (!response.ok) {
            throw new Error(response.statusText);
          }
          return await response.json() as T;
    }catch(error){
        console.error(error);
        return null;
    }
}