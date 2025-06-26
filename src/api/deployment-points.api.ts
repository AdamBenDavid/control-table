import type {PaginatedResult} from "../types/api.types.ts";
import type {DeploymentPoint} from "../DeploymentPointTable/types.ts";
import {axiosInstance} from "./general.api.ts";
import {tryCatch} from "../utils/try-catch.utils.ts";
import {mockDeploymentPoints} from "../DeploymentPointTable/mockData.ts";

export const DeploymentPointApiPrefix = '/deployment-points';

export type GetDeploymentPointsFilters = {
    pageIndex: number;
    pageSize: number;
    search?: string;
}

export const DeploymentPointService = {
    getDeploymentPoints: async ({pageIndex, pageSize}: GetDeploymentPointsFilters) => {
        const {
            data: res,
            error
        } = await tryCatch(axiosInstance.get<PaginatedResult<DeploymentPoint>>(`${DeploymentPointApiPrefix}?page=${pageIndex}&size=${pageSize}`));

        if (error) {
            throw new Error("No data received from the server");
        }

        return res.data;

    },
    getDeploymentPointsMock: async ({pageIndex, pageSize, search}: GetDeploymentPointsFilters) => {
        const filteredPoints = mockDeploymentPoints.filter(point => search ? point.name.includes(search) || point.division.includes(search) : true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            data: filteredPoints.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
            total: filteredPoints.length,
        };
    },
}