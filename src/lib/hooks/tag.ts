/* eslint-disable */
import type { Prisma, Tag } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext, type RequestOptions } from '@zenstackhq/react/runtime';
import * as request from '@zenstackhq/react/runtime';

export function useTag() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/tag/find`, `${endpoint}/tag/aggregate`, `${endpoint}/tag/count`, `${endpoint}/tag/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.TagCreateArgs>(args: Prisma.SelectSubset<T, Prisma.TagCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.TagCreateArgs>, Prisma.CheckSelect<T, Tag, Prisma.TagGetPayload<T>>>(`${endpoint}/tag/create`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.TagCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.TagCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.TagCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/tag/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.TagFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.TagFindManyArgs>, options?: RequestOptions<Array<Prisma.TagGetPayload<T>>>) {
        return request.get<Array<Prisma.TagGetPayload<T>>>(`${endpoint}/tag/findMany`, args, options);
    }

    function findUnique<T extends Prisma.TagFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.TagFindUniqueArgs>, options?: RequestOptions<Prisma.TagGetPayload<T>>) {
        return request.get<Prisma.TagGetPayload<T>>(`${endpoint}/tag/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.TagFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.TagFindFirstArgs>, options?: RequestOptions<Prisma.TagGetPayload<T>>) {
        return request.get<Prisma.TagGetPayload<T>>(`${endpoint}/tag/findFirst`, args, options);
    }

    async function update<T extends Prisma.TagUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.TagUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.TagUpdateArgs>, Prisma.TagGetPayload<T>>(`${endpoint}/tag/update`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.TagUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.TagUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.TagUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/tag/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.TagUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.TagUpsertArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.TagUpsertArgs>, Prisma.TagGetPayload<T>>(`${endpoint}/tag/upsert`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.TagDeleteArgs>(args?: Prisma.SelectSubset<T, Prisma.TagDeleteArgs>) {
        try {
            return await request.del<Prisma.TagGetPayload<T>>(`${endpoint}/tag/delete`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.TagDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.TagDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/tag/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.TagAggregateArgs>(args: Prisma.Subset<T, Prisma.TagAggregateArgs>, options?: RequestOptions<Prisma.GetTagAggregateType<T>>) {
        return request.get<Prisma.GetTagAggregateType<T>>(`${endpoint}/tag/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.TagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
            [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
            ]
        }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
        ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
        ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.TagGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ? Prisma.GetTagGroupByPayload<T> : InputErrors>) {
        return request.get<{} extends InputErrors ? Prisma.GetTagGroupByPayload<T> : InputErrors>(`${endpoint}/tag/groupBy`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy };
}
