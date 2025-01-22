// contexts/BranchContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { getBranches, createBranch, updateBranch, deleteBranch } from '@/Services/branches';
import { Branch } from '@/Services/branches';

interface BranchContextProps {
    branches: Branch[];
    loading: boolean;
    error: string | null;
    fetchBranches: (accessToken: string) => Promise<void>;
    addBranch: (branchData: { name: string }, token: string) => Promise<void>;
    editBranch: (branchData: { id: string; name: string }, token: string) => Promise<void>;
    removeBranch: (id: string, token: string) => Promise<void>;
}

const BranchContext = createContext<BranchContextProps | undefined>(undefined);

export const BranchProvider = ({ children }:{children: React.ReactNode}) => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBranches = useCallback(async (accessToken: string) => {
        setLoading(true);
        try {
            const data = await getBranches(accessToken);
            setBranches(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addBranch = useCallback(async (branchData: { name: string }, token: string) => {
        setLoading(true);
        try {
            const newBranch = await createBranch(branchData, token);
            setBranches((prev) => [...prev, newBranch]);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const editBranch = useCallback(async (branchData: { id: string; name: string }, token: string) => {
        setLoading(true);
        try {
            const updatedBranch = await updateBranch(branchData, token);
            setBranches((prev) =>
                prev.map((branch) => (branch.id === updatedBranch.id ? updatedBranch : branch))
            );
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const removeBranch = useCallback(async (id: string, token: string) => {
        setLoading(true);
        try {
            await deleteBranch(id, token);
            setBranches((prev) => prev.filter((branch) => branch.id !== id));
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <BranchContext.Provider
            value={{ branches, loading, error, fetchBranches, addBranch, editBranch, removeBranch }}
        >
            {children}
        </BranchContext.Provider>
    );
};

export const useBranch = (): BranchContextProps => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error('useBranch must be used within a BranchProvider');
    }
    return context;
};
