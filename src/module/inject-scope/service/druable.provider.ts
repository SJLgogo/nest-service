import { Injectable } from "@nestjs/common";
import { ContextId, ContextIdFactory, ContextIdResolver, ContextIdResolverFn, ContextIdStrategy, HostComponentInfo } from "@nestjs/core";

const tenants = new Map<string , ContextId>()

@Injectable()
export class DurableProvides implements ContextIdStrategy{
    attach(contextId: ContextId, request: any): ContextIdResolverFn | ContextIdResolver {
        const tenantId = request.headers['x-tenant-id'] as string;
        let tenantSubTreeId: ContextId;
    
        if (tenants.has(tenantId)) {
          tenantSubTreeId = tenants.get(tenantId);
        } else {
          tenantSubTreeId = ContextIdFactory.create();
          tenants.set(tenantId, tenantSubTreeId);
        }
    
        // If tree is not durable, return the original "contextId" object
        return (info: HostComponentInfo) =>
          info.isTreeDurable ? tenantSubTreeId : contextId;
      }
}
    